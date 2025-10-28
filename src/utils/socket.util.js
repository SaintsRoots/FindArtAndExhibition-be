import { Server } from "socket.io";
import User from "../models/user.models";
import {
  findUserConversations,
  getUnreadMessageCount,
  findMessagesBetweenUsers,
  sendMessage as sendMessageService,
  findAllArtists,
  markMessageAsRead as markMessageAsReadService,
  findOrCreateConversation,
} from "../services/message.services";

let io;
const userSockets = new Map();

export const config = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
    transports: ["websocket", "polling"],
  });

  io.use(async (socket, next) => {
    try {
      const userId =
        socket.handshake.auth.userId || socket.handshake.query.userId;

      console.log("Authenticating socket for userId ###############", userId);

      if (!userId) {
        return next(new Error("Authentication error: userId is required"));
      }

      // Verify user exists in database
      const user = await User.findById(userId);
      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      // Attach user to socket instance
      socket.user = {
        id: userId,
        name: user.name,
        email: user.email,
        img: user.img,
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.user?.id;
    console.log(`User ${userId} connected with socket ${socket.id}`);

    try {
      userSockets.set(userId, socket.id);
      socket.join(userId);

      const unreadCount = await getUnreadMessageCount(userId);
      const conversations = await findUserConversations(userId);

      socket.emit("user:connected", {
        user: socket.user,
        unreadCount,
        conversations,
      });

      socket.broadcast.emit("user:online", {
        userId,
        name: socket.user.name,
        img: socket.user.img,
      });
    } catch (error) {
      console.error("Connection setup error:", error);
      socket.emit("error", { message: "Failed to setup connection" });
    }

    socket.on("message:send", async (data) => {
      try {
        const senderId = socket.user?.id;
        const { receiverId, content, messageType } = data;

        if (!senderId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        // Save message to database using your existing service
        const messageData = {
          sender: senderId,
          receiver: receiverId,
          content,
          messageType,
        };

        const savedMessage = await sendMessageService(messageData);

        // Prepare message data for real-time emission
        const messagePayload = {
          _id: savedMessage._id,
          senderId: savedMessage.sender._id,
          senderName: savedMessage.sender.name,
          senderImg: savedMessage.sender.img,
          receiverId: savedMessage.receiver._id,
          receiverName: savedMessage.receiver.name,
          content: savedMessage.content,
          messageType: savedMessage.messageType,
          fileUrl: savedMessage.fileUrl,
          timestamp: savedMessage.createdAt,
          isRead: savedMessage.isRead,
        };

        // Emit to sender
        socket.emit("message:sent", {
          success: true,
          message: messagePayload,
          timestamp: new Date(),
        });

        // Emit to receiver if online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverId).emit("message:received", messagePayload);
        }

        // Update conversations for both users
        const senderConversations = await findUserConversations(senderId);
        const receiverConversations = await findUserConversations(receiverId);

        socket.emit("conversations:updated", senderConversations);
        if (receiverSocketId) {
          io.to(receiverId).emit(
            "conversations:updated",
            receiverConversations
          );
        }
      } catch (error) {
        console.error("Send message error:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("messages:load", async (data) => {
      try {
        const userId = socket.user?.id;
        const { otherUserId, page = 1, limit = 50 } = data;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        const messages = await findMessagesBetweenUsers(
          userId,
          otherUserId,
          page,
          limit
        );

        socket.emit("messages:loaded", {
          otherUserId,
          messages,
          page,
          limit,
        });
      } catch (error) {
        console.error("Load messages error:", error);
        socket.emit("error", { message: "Failed to load messages" });
      }
    });

    socket.on("conversation:create", async (data) => {
      try {
        const userId = socket.user?.id;
        const { otherUserId } = data;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        const conversation = await findOrCreateConversation(
          userId,
          otherUserId
        );

        socket.emit("conversation:created", conversation);

        // Also update conversations list
        const conversations = await findUserConversations(userId);
        socket.emit("conversations:updated", conversations);
      } catch (error) {
        console.error("Create conversation error:", error);
        socket.emit("error", { message: "Failed to create conversation" });
      }
    });

    socket.on("conversations:load", async () => {
      try {
        const userId = socket.user?.id;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        const conversations = await findUserConversations(userId);
        socket.emit("conversations:loaded", conversations);
      } catch (error) {
        console.error("Load conversations error:", error);
        socket.emit("error", { message: "Failed to load conversations" });
      }
    });

    socket.on("artists:load", async () => {
      try {
        const userId = socket.user?.id;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        const artists = await findAllArtists();
        socket.emit("artists:loaded", artists);
      } catch (error) {
        console.error("Load artists error:", error);
        socket.emit("error", { message: "Failed to load artists" });
      }
    });

    socket.on("typing:start", (receiverId) => {
      const userId = socket.user?.id;
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId && userId) {
        io.to(receiverId).emit("user:typing", {
          userId,
          userName: socket.user.name,
        });
      }
    });

    socket.on("typing:stop", (receiverId) => {
      const userId = socket.user?.id;
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId && userId) {
        io.to(receiverId).emit("user:stopped_typing", {
          userId,
          userName: socket.user.name,
        });
      }
    });

    socket.on("message:read", async (data) => {
      try {
        const userId = socket.user?.id;
        const { messageId, senderId } = data;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        // Mark message as read in database
        const updatedMessage = await markMessageAsReadService(
          messageId,
          userId
        );

        // Notify sender that message was read
        const senderSocketId = userSockets.get(senderId);
        if (senderSocketId) {
          io.to(senderId).emit("message:read_receipt", {
            messageId,
            readBy: userId,
            readAt: updatedMessage.readAt,
          });
        }

        // Update unread count for current user
        const unreadCount = await getUnreadMessageCount(userId);
        socket.emit("unread:updated", unreadCount);
      } catch (error) {
        console.error("Mark message as read error:", error);
        socket.emit("error", { message: "Failed to mark message as read" });
      }
    });

    socket.on("unread:count", async () => {
      try {
        const userId = socket.user?.id;

        if (!userId) {
          socket.emit("error", { message: "Unauthorized" });
          return;
        }

        const unreadCount = await getUnreadMessageCount(userId);
        socket.emit("unread:count", unreadCount);
      } catch (error) {
        console.error("Get unread count error:", error);
        socket.emit("error", { message: "Failed to get unread count" });
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.user?.id;
      console.log(`User ${userId} disconnected from socket ${socket.id}`);

      if (userId) {
        userSockets.delete(userId);
        socket.broadcast.emit("user:offline", {
          userId,
          name: socket.user.name,
        });
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  return io;
};

export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(userId).emit(event, data);
  }
};

export const isUserOnline = (userId) => {
  return userSockets.has(userId);
};

export const getOnlineUsers = () => {
  return Array.from(userSockets.keys());
};

export const getUserSocket = (userId) => {
  return userSockets.get(userId);
};

export { io };
