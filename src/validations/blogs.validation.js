import Joi from "joi"

const createPostSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    image: Joi.string().optional(),
});

// Validation schema for updating a Post
const updatePostSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  image: Joi.string().optional(),
}).or('title', 'description','category','image'); 

// Function to validate Post creation
export const validateCreatepost = (PostData) => {
  return createPostSchema.validate(PostData);
};

// Function to validate Post update
export const validateUpdatePost = (PostData) => {
  return updatePostSchema.validate(PostData);
};


