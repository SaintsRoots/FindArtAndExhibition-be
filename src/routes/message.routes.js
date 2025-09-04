import express from "express";
import fileUpload from "../helper/multer.js";
import { 
    getUserConversations, 
    getMessagesBetweenUsers, 
    sendMessage, 
    getAllArtists, 
    getUnreadCount, 
    markAsRead, 
    deleteMessage, 
    getOrCreateConversation 
} from "../controllers/message.controller.js";

const messageRoute = express.Router();

// Get all conversations for a user
messageRoute.get("/conversations/:userId", getUserConversations);

// Get messages between two users
messageRoute.get("/:userId/:otherUserId", getMessagesBetweenUsers);

// Send a new message
messageRoute.post("/", fileUpload.single("file"), sendMessage);

// Get all artists
messageRoute.get("/artists/all", getAllArtists);

// Get unread message count
messageRoute.get("/unread/:userId", getUnreadCount);

// Mark message as read
messageRoute.put("/read/:messageId", fileUpload.single("files"), markAsRead);

// Delete a message
messageRoute.delete("/:messageId", fileUpload.single("files"), deleteMessage);

// Get or create conversation between two users
messageRoute.get("/conversation/:userId1/:userId2", getOrCreateConversation);

export default messageRoute;