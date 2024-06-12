import Testimonials from "../models/testimonials.model";

// service to create a Testimonial
export const createTestimonial = async (testimonialData,userNames,userImage, user) => {
  const { message } = testimonialData;
  return await Testimonials.create({
    names: userNames,
    image: userImage,
    message,
    owner: user,
  });
};


// service to retrieve all Testimonials
export const getTestimonial = async () => {
  return await Testimonials.find().select('-owner')
};

// service to retrieve a single Testimonial by id
export const getOneTestimonial = async (TestimonialId) => {
  return await Testimonials.findById(TestimonialId)
};
// service delete a Testimonials
export const deleteTestimonial = async (id) => {
  await Testimonials.findByIdAndDelete(id);
};
