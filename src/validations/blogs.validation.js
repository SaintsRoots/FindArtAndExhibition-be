import Joi from "joi";

//  Validation Posts Schema data

const postValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().optional(),
    image: Joi.string(),
});


// Exporting validated data

export const validatePost = (postsData) => {
    return postValidationSchema.validate(postsData);
  };
  