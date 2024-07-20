import mongoose from 'mongoose';

const artsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
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
    available_arts: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,

});

const Arts = mongoose.models.arts || mongoose.model("arts", artsSchema);

export default Arts;
