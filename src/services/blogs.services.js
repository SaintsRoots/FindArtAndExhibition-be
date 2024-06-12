import Posts from "../models/blogs.model";
import { uploadToCloud } from "../helper/cloud";

// service to create a post
export const createPost = async (postData, file, user) => {
  const { title, description, category } = postData;
  let result;
  if (file) result = await uploadToCloud(file);
  return await Posts.create({
    title,
    description,
    category,
    image: result?.secure_url,
    creator: user,
  });
};

// service to retrieve all posts
export const getPost = async () => {
  return await Posts.find().populate({
    path: "creator",
    select: 'name email profile',
  });
};

// service to retrieve a single post by id
export const getOnePost = async (postId) => {
  return await Posts.findById(postId)
  .populate({
    path: "creator",
    select: 'name email profile',
  });
};
// get by posts category

export const getPostsByCategory = async (category) => {
    const posts = await Posts.find({ category }).populate({
        path: "creator",
        select: 'name email profile',
      });
    if (!posts) {
        throw new Error("Posts category not found");
    }
    return posts;
}

// get art by title
export const getPostByTitle = async (title) => {
    const post = await Posts.findOne({ title }).populate({
        path: "creator",
        select: 'name email profile',
      });
    if (!post) {
        throw new Error("Post title not found");
    }
    return post;
}
// service to updated post info by id
export const updatePost = async (id, postData, file, user) => {
  const { title, description, category } = postData;
  let result;
  if (file) result = await uploadToCloud(file);
  return await Posts.findByIdAndUpdate(id, {
    title,
    description,
    category,
    image: result?.secure_url,
    creator: user,
  });
};

// service delete a Posts
export const deletePost = async (id) => {
  await Posts.findByIdAndDelete(id);
};
