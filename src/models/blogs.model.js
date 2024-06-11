import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now }
});

const Posts = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Posts;
