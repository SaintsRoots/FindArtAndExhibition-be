import Testimonials from "../models/testimonials.model";
import User from "../models/user.models";
import * as testimonialService from "../services/testimonials.services";
import { validateCreateTestimonial } from "../validations/testimonials.validation";

// controller to create a testimonial
export const createTestimonial = async (req, res) => {
  const { error, value } = validateCreateTestimonial(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // Find logged user infor
    const userId = req.User._id;
    console.log(userId)
    const loggedUser = await User.findById(userId);
    console.log(loggedUser);
    const names = loggedUser.name;
    const image = loggedUser.img;
    console.log("Full names:",names)
    const createdTestimonial = await testimonialService.createTestimonial(
      value,
      names,
      image,
      req.User._id,
    );
    console.log(createdTestimonial);
    return res.status(201).json({
      status: "201",
      message: "Testimonial sent",
      data: createdTestimonial,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to send a testimonial",
      error: error.message,
    });
  }
};
// constroller to retrieve all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonial();
    return res.status(200).json({
      status: "200",
      message: "Testimonials retrieved",
      data: testimonials,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve testimonials",
      error: error.message,
    });
  }
};

// controller to retrieve single testimonial by id
export const getOneTestimonial = async (req, res) => {
  try {
    const { TestimonialId } = req.params;
    const testimonial = await testimonialService.getOneTestimonial(TestimonialId);

    if (!testimonial) {
      return res.status(404).json({
        status: "404",
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Testimonial retrieved",
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve testimonial",
      error: error.message,
    });
  }
};

// controller to delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Testimonials.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Testimonial not found",
      });
    }
    await testimonialService.deleteTestimonial(id);
    return res.status(200).json({
      status: "200",
      message: "Testimonial deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

