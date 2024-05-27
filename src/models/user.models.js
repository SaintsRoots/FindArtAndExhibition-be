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
        phone: {
            type: String,
        },
        province: {
            type: String,
        },
        district: {
            type: String,
        },
        sector: {
            type: String,
        },
        street: {
            type: String,
        },
        status: {
            type: String,
            default: "pending",
        },
        role: {
            type: String,
            enum: ["Admin", "Artist", "User"],
            default: "Artist",
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
