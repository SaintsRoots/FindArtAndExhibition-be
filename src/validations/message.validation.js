import Joi from "joi";

export const validateSendMessage = (data) => {
    const schema = Joi.object({
        sender: Joi.string().required(),
        receiver: Joi.string().required(),
        content: Joi.string().allow(null, '').optional(),
        messageType: Joi.string().valid('text', 'image', 'file').default('text'),
    });
    return schema.validate(data);
};

export const validateGetMessages = (data) => {
    const schema = Joi.object({
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).max(100).default(50),
    });
    return schema.validate(data);
};