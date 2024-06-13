import express from "express";
import fileUpload from "../helper/multer";
import authMiddleware from "../middleware/authMiddleware";
import {
  createTestimonial,
  getTestimonials,
  getOneTestimonial,
  deleteTestimonial,
} from "../controllers/testimonials.controllers";

const testimonialRoutes = express.Router();

testimonialRoutes.get("/", getTestimonials);
testimonialRoutes.get("/:TestimonialId", getOneTestimonial);
testimonialRoutes.post("/",authMiddleware, fileUpload.single("image"), createTestimonial);
testimonialRoutes.delete("/:id", authMiddleware, deleteTestimonial);

export default testimonialRoutes;
