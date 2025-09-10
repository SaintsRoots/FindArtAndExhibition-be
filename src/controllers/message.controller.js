import * as messageService from "../services/message.services";
import { validateSendMessage, validateGetMessages } from "../validations/message.validation";

// Get all conversations for a user
export const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await messageService.findUserConversations(userId);
        
        res.status(200).json({
            status: "200",
            message: "Conversations retrieved successfully",
            data: conversations,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve conversations",
            error: error.message,
        });
    }
};

// Get messages between two users
// export const getMessagesBetweenUsers = async (req, res) => {
//     try {
//         const { userId, otherUserId } = req.params;
//         const { page = 1, limit = 50 } = req.query;
        
//         const messages = await messageService.findMessagesBetweenUsers(
//             userId, 
//             otherUserId, 
//             parseInt(page), 
//             parseInt(limit)
//         );
        
//         res.status(200).json({
//             status: "200",
//             message: "Messages retrieved successfully",
//             data: messages,
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: "500",
//             message: "Failed to retrieve messages",
//             error: error.message,
//         });
//     }
// };

export const getMessagesBetweenUsers = async (req, res) => {
    try {
        const { error, value } = validateGetMessages(req.query);
        if (error) {
            return res.status(400).json({
                status: "400",
                message: error.details[0].message,
            });
        }

        const { userId, otherUserId } = req.params;
        const { page, limit } = value;

        const messages = await messageService.findMessagesBetweenUsers(
            userId,
            otherUserId,
            page,
            limit
        );

        res.status(200).json({
            status: "200",
            message: "Messages retrieved successfully",
            data: messages,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve messages",
            error: error.message,
        });
    }
};

// Send a new message
export const sendMessage = async (req, res) => {
    const { error, value } = validateSendMessage(req.body);
    if (error) {
        return res.status(400).json({ 
            status: "400",
            message: error.details[0].message 
        });
    }

    try {
        const message = await messageService.sendMessage(value, req.file);
        
        res.status(201).json({
            status: "201",
            message: "Message sent successfully",
            data: message,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to send message",
            error: error.message,
        });
    }
};

// Get all artists
export const getAllArtists = async (req, res) => {
    try {
        const artists = await messageService.findAllArtists();
        
        res.status(200).json({
            status: "200",
            message: "Artists retrieved successfully",
            data: artists,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve artists",
            error: error.message,
        });
    }
};

// Get unread message count
export const getUnreadCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const unreadCount = await messageService.getUnreadMessageCount(userId);
        
        res.status(200).json({
            status: "200",
            message: "Unread count retrieved successfully",
            data: { unreadCount },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve unread count",
            error: error.message,
        });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.body;
        
        const message = await messageService.markMessageAsRead(messageId, userId);
        
        res.status(200).json({
            status: "200",
            message: "Message marked as read",
            data: message,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to mark message as read",
            error: error.message,
        });
    }
};

// Delete a message
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.body;
        
        await messageService.deleteMessage(messageId, userId);
        
        res.status(200).json({
            status: "200",
            message: "Message deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to delete message",
            error: error.message,
        });
    }
};

// Get or create conversation
export const getOrCreateConversation = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        
        const conversation = await messageService.findOrCreateConversation(userId1, userId2);
        
        res.status(200).json({
            status: "200",
            message: "Conversation retrieved successfully",
            data: conversation,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve conversation",
            error: error.message,
        });
    }
};