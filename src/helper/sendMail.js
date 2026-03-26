import nodemailer from "nodemailer";

export const sendMail = (emailTemplate) => {
  const { emailTo, subject, message } = emailTemplate;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port:587,
    secure:false,
    auth: {
      user: process.env.UserMailer,
      pass: process.env.PasswordMailer,
    },
  });
  let mailOptions = {
    from: process.env.UserMailer,
    to: emailTo,
    subject,
    html: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + mailOptions.to, info.response);
    }
  });
};

export default sendMail;


// import nodemailer from "nodemailer";

// export const sendMail = async (emailTemplate) => {
//   const { emailTo, subject, message } = emailTemplate;

//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.UserMailer,
//       pass: process.env.PasswordMailer,
//     },
//     connectionTimeout: 10000,
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
//   });

//   try {
//     await transporter.verify();
//     const info = await transporter.sendMail({
//       from: process.env.UserMailer,
//       to: emailTo,
//       subject,
//       html: message,
//     });
//     console.log("Email sent:", emailTo, info.response);
//   } catch (error) {
//     console.error("sendMail error:", error);
//   }
// };
