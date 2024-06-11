import * as postService from "../services/blogs.services"
import { validatePost } from "../validations/blogs.validation";


export const createPost = async (req, res) => {
    const { error, value } = validatePost(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {

        const post = await postService.createPost(
            value,
            req.file,
            req.User._id
        );

        return res.status(201).json({
            status: "201",
            message: "Post created",
            data: post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to a post",
            error: error.message,
        });
    }
};

// get all posts

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json({
            status: 200,
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get all posts",
            error: error.message
        });
    }
};

// get post by id

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        return res.status(200).json({
            status: 200,
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get single post",
            error: error.message
        });
    }
};

// get post by thier category
export const getPostByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await postService.getPostByCategory(category);
        return res.status(200).json({
            status: 200,
            data: posts,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get post by category",
            error: error.message,
        });
    }
};

// get Post by title

export const getPostByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const posts = await postService.getPostByTitle(title);
        return res.status(200).json({
            status: 200,
            data: posts,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Failed to get post by title",
            error: error.message,
        });
    }
};

// update post
export const updatePost = async (req, res) => {
    const { error, value } = validatePost(req.body);
    console.log(value);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        const { id } = req.params

        const post = await postService.updatePost(
            id,
            value,
            req.file,
            req.User._id
        );

        return res.status(201).json({
            status: "201",
            message: "Arts Updated",
            data: post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Failed to Update post",
            error: error.message,
        });
    }
};

// delete post

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
       const deletedPost = await postService.deletePost(id);
        return res.status(200).json({
            status: 200,
            message: "Arts deleted",
            data: deletedPost,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to delete post",
            error: error.message
        });
    }
};
