import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    
    owner:{
        type: mongoose.Schema.ObjectId, ref:"users",
      },
  },
  {
    timestamps: true,
  }
);

const Testimonials = mongoose.models.testimonials || mongoose.model('testimonials', testimonialSchema);

export default Testimonials;
