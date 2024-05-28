import sendMail from "../helper/sendMail";

// Function to send a welcome email to a new administrator
export const sendWelcomeEmailToAdmin = (email, name) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Welcome Aboard - Find Arts Team!",
    message: `
      <h1>Welcome, ${name}!</h1>
      <p>
        Thank you for joining the Find Arts System and Exhibition team! We are thrilled to have you onboard as we continue to enhance our services. We look forward to exciting collaborations and impactful work.
      </p>
      <p>
        Best regards,<br/>
        The Find Arts System and Exhibition Team
      </p>
    `,
  };

  sendMail(emailTemplate);
};

// Function to send a password reset email
export const sendResetEmail = (email, name, link, resetCode) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Password reset Code",
    message: `<h1>Dear ${name},</h1></br>
      <h3>Reset Code: ${resetCode}</h3><br>
      To reset your password click this link: ${link} <br>
      For any reason if the link is not working you can click reset password button below.<br><br>
      <a href="${link}" style="background-color:#ad498c;width:8rem;height:2rem;padding:8px;color:white;font-weight:600;border-radius:10px;text-decoration:none;">
      Reset Password
      </a><br><br>
      Reset password code is only valid for <b>15 minutes</b>.
      <br/><br/>
      The Find Arts System And Exihibition Team<br/>`,
  };

  sendMail(emailTemplate);

};



// Function to send an email to the person who made an order
export const sendEmailPersonBookedArts = (email, name, orderDetails) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Order Confirmation!",
    message: `
      <p>Hi ${name},</p>
      <p>Your Arts order for ${orderDetails.totalItems} items has been successfully placed!</p>
      <p>Total price: ${orderDetails.totalPrice} FRW</p>
      <p>Thank you for your purchase. We will notify you once your items are shipped.</p>
    `,
  };

  sendMail(emailTemplate);
};

// Approve Message

export const sendEmailApproveArts = (email, name, updatedAt) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Approval Confirmation!",
    message: `
      <p>Hi ${name},</p>
      <p>Congratulations! Your request to become an artist has been approved.</p>
      <p>As of ${updatedAt}, you can now customize your dashboard and start showcasing your art.</p>
      <p>Thank you for joining us. We look forward to seeing your amazing work!</p>
    `,
  };

  sendMail(emailTemplate);
};