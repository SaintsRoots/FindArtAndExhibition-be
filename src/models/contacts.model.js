import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subject:{
        type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.contactus || mongoose.model('contactus', contactSchema);

export default Contact;