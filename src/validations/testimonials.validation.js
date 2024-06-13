import Joi from "joi"

const createTestimonialSchema = Joi.object({
    names: Joi.string().optional().min(3).max(30),
    image: Joi.string().optional(),
    message: Joi.string().required().min(6).max(1000),
});

// Function to validate message creation
export const validateCreateTestimonial = (TestimonialsData) => {
  return createTestimonialSchema.validate(TestimonialsData);
};
