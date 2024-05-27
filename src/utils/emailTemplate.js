import sendMail from "../helper/sendMail";

// Function to send a welcome email to a new administrator
export const sendWelcomeEmailToAdmin = (email, name) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Welcome Aboard - Find Arts Team!",
    message: `<h1>Welcome, ${name}!</h1><br/>
    Thank you for joining the Find Arts System And Exihibition team! We are thrilled to have you onboard as we continue to enhance our Find Arts System And Exihibition services. Look forward to exciting collaborations and impactful work.<br/>
    Best regards,<br/>
    The Find Arts System And Exihibition Team<br/>`,
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



// sending Email Person Booked tickets
export const sendEmailPersonBookedArts = (email, name, eventDetails) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Booking Confirmation!",
    message: `<p>Hi,${name}<br>Your booking for ${eventDetails.number_of_tickets} tickets to ${eventDetails.title} has been confirmed!</p><p>Total price: ${eventDetails.total_price} FRW</p>`,
  };

  sendMail(emailTemplate);
};

// Approve Message

export const sendEmailApproveArts = (email, name, updatedAt) => {
  const emailTemplate = {
    emailTo: email,
    subject: "Approval Confirmation!",
    message: `<p>Hi,${name}<br>Your Request for being An Artist has been confirmed!</p><p>Date ${updatedAt} Now you Can customize your Dashboard</p>`,
  };

  sendMail(emailTemplate);
};