import express from "express";
import Auth from "../middleware/authMiddleware";
import fileUpload from "../helper/multer";
import { 
    createPost,
    getAllPosts,
    getPostById,
    getPostByCategory,
    getPostByTitle,
    updatePost,
    deletePost

 } from "../services/blogs.services";

const postRoutes = express.Router();

postRoutes.post("/", fileUpload.single("image"), Auth, createPost);
postRoutes.get("/", getAllPosts);
postRoutes.get("/:id", getPostById);
postRoutes.get("/category/:category", getPostByCategory);
postRoutes.get("/title/:title", getPostByTitle);
postRoutes.delete("/:id", deletePost);
postRoutes.put("/:id", fileUpload.single("image"), Auth, updatePost);

export default postRoutes;
