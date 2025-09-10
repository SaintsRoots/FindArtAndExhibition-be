import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import User from "../models/user.models";
import { uploadToCloud } from "../helper/cloud";

// Service to get all conversations for a user
export const findUserConversations = async (userId) => {
    return await Conversation.find({
        participants: userId,
        isActive: true
    })
    .populate('participants', 'name email img role')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });
};

// Service to get messages between two users
export const findMessagesBetweenUsers = async (userId, otherUserId, page = 1, limit = 50) => {
    const messages = await Message.find({
        $or: [
            { sender: userId, receiver: otherUserId },
            { sender: otherUserId, receiver: userId }
        ]
    })
    .populate('sender', 'name img role')
    .populate('receiver', 'name img role')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    // Mark messages as read
    await Message.updateMany(
        { sender: otherUserId, receiver: userId, isRead: false },
        { isRead: true, readAt: new Date() }
    );

    return messages.reverse(); // Return oldest first
};

// Service to send a new message
export const sendMessage = async (messageData, file) => {
    const { sender, receiver, content, messageType = 'text' } = messageData;

    // Validate that sender and receiver exist
    const senderUser = await User.findById(sender);
    const receiverUser = await User.findById(receiver);

    if (!senderUser || !receiverUser) {
        throw new Error('Sender or receiver not found');
    }

    // Handle file upload if present
    let fileUrl = null;
    if (file) {
        const result = await uploadToCloud(file);
        fileUrl = result.secure_url;
    }

    // Create new message
    const message = new Message({
        sender,
        receiver,
        content,
        messageType,
        fileUrl
    });

    await message.save();

    // Update or create conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver] }
    });

    if (!conversation) {
        conversation = new Conversation({
            participants: [sender, receiver],
            lastMessage: message._id,
            lastMessageAt: new Date()
        });
    } else {
        conversation.lastMessage = message._id;
        conversation.lastMessageAt = new Date();
    }

    await conversation.save();

    // Populate and return the message
    return await Message.findById(message._id)
        .populate('sender', 'name img role')
        .populate('receiver', 'name img role');
};

// Service to get all artists
export const findAllArtists = async () => {
    return await User.find({
        role: 'Artist',
        status: 'approved'
    }).select('name email img province district sector role');
};

// Service to get unread message count
export const getUnreadMessageCount = async (userId) => {
    return await Message.countDocuments({
        receiver: userId,
        isRead: false
    });
};

// Service to mark message as read
export const markMessageAsRead = async (messageId, userId) => {
    const message = await Message.findById(messageId);
    if (!message) {
        throw new Error('Message not found');
    }

    if (message.receiver.toString() !== userId) {
        throw new Error('Unauthorized to mark this message as read');
    }

    message.isRead = true;
    message.readAt = new Date();
    await message.save();

    return message;
};

// Service to delete a message
export const deleteMessage = async (messageId, userId) => {
    const message = await Message.findById(messageId);
    if (!message) {
        throw new Error('Message not found');
    }

    if (message.sender.toString() !== userId) {
        throw new Error('Unauthorized to delete this message');
    }

    return await Message.findByIdAndDelete(messageId);
};

// Service to get conversation between two users
export const findOrCreateConversation = async (userId1, userId2) => {
    let conversation = await Conversation.findOne({
        participants: { $all: [userId1, userId2] }
    }).populate('participants', 'name email img role');

    if (!conversation) {
        conversation = new Conversation({
            participants: [userId1, userId2],
            lastMessageAt: new Date()
        });
        await conversation.save();
        
        conversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name email img role');
    }

    return conversation;
};
