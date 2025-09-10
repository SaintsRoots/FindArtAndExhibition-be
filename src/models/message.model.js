import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    content: {
        type: String,
        default: null,
        trim: true
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text'
    },
    fileUrl: {
        type: String,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema);
export default Message;