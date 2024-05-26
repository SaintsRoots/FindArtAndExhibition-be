import mongoose from "mongoose";

const resetCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        length: 6,
        unique: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '15m'}
    }
}, 
{
    timestamps: true,
}
);

const Code = mongoose.model('resetCode', resetCodeSchema);
export default Code;