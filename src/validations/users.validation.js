import Joi from "joi"
// Validation schema for creating a new user
const createUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(50),
    img: Joi.string().optional(),
    role: Joi.string().optional(),
});

// Validation schema for updating a user
const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(3).max(50).optional(),
    img: Joi.string().optional(),
    role: Joi.string().optional(),
}).or('name', 'email', 'password', 'img');

// Validation schema for user login
const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Validation schema for forgot password
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

// Validation schema for forgot password
const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    code: Joi.string().required(),
});

// Function to validate user creation
export const validateCreateUser = (userData) => {
    return createUserSchema.validate(userData);
};

// Function to validate user update
export const validateUpdateUser = (userData) => {
    return updateUserSchema.validate(userData);
};

// Function to validate user login
export const validateLoginUser = (userData) => {
    return loginUserSchema.validate(userData);
};

// Function to validate forgot password
export const validateForgotPassword = (email) => {
    return forgotPasswordSchema.validate(email);
};

// Function to validate reset password
export const validateResetPassword = (userData) => {
    return resetPasswordSchema.validate(userData);
};
