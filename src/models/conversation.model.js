import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.ObjectId,
        ref: 'messages'
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Conversation = mongoose.models.conversations || mongoose.model("conversations", conversationSchema);
export default Conversation;