import express from "express";
import fileUpload from "../helper/multer";
import { 
    getUserConversations, 
    getMessagesBetweenUsers, 
    sendMessage, 
    getAllArtists, 
    getUnreadCount, 
    markAsRead, 
    deleteMessage, 
    getOrCreateConversation 
} from "../controllers/message.controller";

const messageRoute = express.Router();

// Get all artists 
messageRoute.get("/artists/all", getAllArtists);

// Get all conversations for a user 
messageRoute.get("/conversations/:userId", getUserConversations);

// Get unread message count 
messageRoute.get("/unread/:userId", getUnreadCount);

// Get or create conversation between two users 
messageRoute.get("/conversation/:userId1/:userId2", getOrCreateConversation);

// Send a new message
messageRoute.post("/sendMessage", fileUpload.single("fileUrl"), sendMessage);

// Mark message as read
messageRoute.put("/read/:messageId", fileUpload.single("files"), markAsRead);

// Delete a message
messageRoute.delete("/:messageId", fileUpload.single("files"), deleteMessage);

// Get messages between two users 
messageRoute.get("/:userId/:otherUserId", getMessagesBetweenUsers);

export default messageRoute;