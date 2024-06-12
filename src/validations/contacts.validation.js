import Joi from "joi"

const createMessageSchema = Joi.object({
    names: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    subject: Joi.string().required().min(3).max(100),
    message: Joi.string().required().min(6).max(255),
});


// Function to validate message creation
export const validateCreateMessage = (MessageData) => {
  return createMessageSchema.validate(MessageData);
};


