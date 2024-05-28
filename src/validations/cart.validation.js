import Joi from "joi";

// Arts Validation Schemas

const cartValidationSchema = Joi.object({
    quantity: Joi.number().required(),

});

// validate arts schema

export const validateCArt = (cartsData) => {
    return cartValidationSchema.validate(cartsData);
};
