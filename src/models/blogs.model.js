import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category:{
        type: String,
    },
    image: {
      type: String,
    },
    creator:{
      type: mongoose.Schema.ObjectId, ref:"users",
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.models.posts || mongoose.model('posts', postSchema);

export default Posts;