import Joi from "joi";

// Arts Validation Schemas

const artValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().optional(),
    available_arts: Joi.number().required(),
    image: Joi.string(),
});


// validate arts schema

export const validateArt = (artsData) => {
    return artValidationSchema.validate(artsData);
  };
  