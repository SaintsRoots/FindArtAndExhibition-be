import nodemailer from "nodemailer";

// 1. Create transporter ONCE outside the function for connection pooling
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.UserMailer,
    pass: process.env.PasswordMailer,
  },
  // 2. Add explicit timeouts to prevent hanging
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,
  socketTimeout: 15000,
});

export const sendMail = async (emailTemplate) => {
  const { emailTo, subject, message } = emailTemplate;

  const mailOptions = {
    from: process.env.UserMailer,
    to: emailTo,
    subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailTo}: ${info.response}`);
    return info;
  } catch (error) {
    console.error("Mail Error:", error.message);
    // You might want to implement a retry logic here or log to a service
    throw error; 
  }
};

export default sendMail;