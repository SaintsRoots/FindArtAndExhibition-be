import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profile: {
            type: String,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
