import Posts from "../models/blogs.model";
import * as blogService from "../services/blogs.services";
import { validateCreatepost, validateUpdatePost } from "../validations/blogs.validation";

// controller to create a post
export const createPost = async (req, res) => {
  const { error, value } = validateCreatepost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if post already exits
    const { title } = req.body;
    const postExist = await Posts.findOne({ title: title });

    if (postExist) {
      return res.status(403).json({
        status: "403",
        message: "Post already exists",
      });
    }
    const createdPost = await blogService.createPost(
      value,
      req.file,
      req.User._id
    );
    return res.status(201).json({
      status: "201",
      message: "Post created successfully",
      data: createdPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create a post",
      error: error.message,
    });
  }
};

// constroller to retrieve all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await blogService.getPost();
    return res.status(200).json({
      status: "200",
      message: "Posts are retrieve successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
};

// controller to retrieve single post by id
export const getOnePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await blogService.getOnePost(postId);

    if (!post) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
};

// controller to update post by id
export const updatePost = async (req, res) => {
  const { error, value } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Posts.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }
    await blogService.updatePost(
      id,
      value,
      req.file,
      req.User._id
    );
    return res.status(201).json({
      status: "201",
      message: "Post Data Updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Update Post Data",
      error: error.message,
    });
  }
};

// controller to delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Posts.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Post not found",
      });
    }
    await blogService.deletePost(id);
    return res.status(200).json({
      status: "200",
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

// get posts by category
export const getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await blogService.getPostsByCategory(category);
        return res.status(200).json({
            status: 200,
            message:"Posts based category retrieved",
            data: posts,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to get art by posts",
            error: error.message,
        });
    }
};

// get post by title

export const getPostByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const post = await blogService.getPostByTitle(title);
        return res.status(200).json({
            status: 200,
            data: post,
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