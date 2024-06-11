import Posts from "../models/blogs.model";
import { uploadToCloud } from "../helper/cloud";

export const createPost = async (postsData, file, user) => {
  let result;
  if (file) result = await uploadToCloud(file);
  const { title, description, category } = postsData;

  // existing post
  const existingPost = await Posts.findOne({ title });
  if (existingPost) {
    throw new Error("Post already exists");
  }

  return await Arts.create({
    title,
    description,
    category,
    image: result?.secure_url,
    creator: user,
  });
};
// get All posts

export const getAllPosts = async () => {
  return await Posts.find();
};

// get post by id

export const getPostById = async (id) => {
  const postData = await Posts.findById(id).populate(
    "creator",
    "name email profile"
  );
  if (!postData) {
    throw new Error("Post not found");
  }
  return postData;
};
// get post by category

export const getPostByCategory = async (category) => {
  const postData = await Posts.find({ category });
  if (!postData) {
    throw new Error("Post category not found");
  }
  return postData;
};

// get Post by title
export const getPostByTitle = async (title) => {
  const postData = await Posts.findOne({ title }).populate(
    "creator",
    "name email profile"
  );
  if (!postData) {
    throw new Error("Post title not found");
  }
  return postData;
};

// update post

export const updatePost = async (id, postsData, file, user) => {
  let result;
  if (file) result = await uploadToCloud(file);
  const postToUpdate = await Posts.findById(id);
  if (!postToUpdate) {
    throw new Error("Post not found");
  }
  const { title, description, category } = postsData;
  return await Posts.findByIdAndUpdate(id, {
    title,
    description,
    category,
    image: result?.secure_url,
    creator: user,
  });
};

// delete post

export const deletePost = async (id) => {
  const postToDelete = await Posts.findById(id);
  if (!postToDelete) {
    throw new Error("Post not found");
  }
  return await Posts.findByIdAndDelete(id);
};
