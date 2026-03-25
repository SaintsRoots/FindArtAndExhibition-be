import sendMail from "../helper/sendMail";

// ─── Base Layout ──────────────────────────────────────────────────────────────

const baseLayout = (subject, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 48px 24px; border-bottom:2px solid #1a1a2e;">
              <p style="margin:0; font-size:13px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#1a1a2e;">ArtStore</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 48px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px; border-top:1px solid #e8e8e8;">
              <p style="margin:0; font-size:11px; color:#999999; letter-spacing:0.5px;">© ${new Date().getFullYear()} ArtStore</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ─── Format Date Helper ───────────────────────────────────────────────────────

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ─── Shared Styles ────────────────────────────────────────────────────────────

const heading = (text) =>
  `<p style="margin:0 0 20px; font-size:22px; font-weight:700; color:#1a1a2e; line-height:1.3;">${text}</p>`;

const body = (text) =>
  `<p style="margin:0 0 20px; font-size:14px; color:#555555; line-height:1.8;">${text}</p>`;

const button = (href, label) => `
  <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
    <tr>
      <td style="background:#1a1a2e;">
        <a href="${href}" style="display:inline-block; padding:12px 28px; font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#e2b96f; text-decoration:none;">${label}</a>
      </td>
    </tr>
  </table>
`;

const note = (text) =>
  `<p style="margin:0; font-size:12px; color:#aaaaaa; line-height:1.7;">${text}</p>`;

// ─── Welcome Email ────────────────────────────────────────────────────────────

export const sendWelcomeEmailToAdmin = (email, name) => {
  const content = `
    ${heading(`Welcome, ${name}.`)}
    ${body(`You've joined the ArtStore team. We're glad to have you — log in to your dashboard to get started.`)}
    ${note(`The ArtStore Team`)}
  `;

  sendMail({
    emailTo: email,
    subject: "Welcome to ArtStore",
    message: baseLayout("Welcome to ArtStore", content),
  });
};

// ─── Password Reset Email ─────────────────────────────────────────────────────

export const sendResetEmail = (email, name, link, resetCode) => {
  const content = `
    ${heading("Reset your password")}
    ${body(`Hi ${name}, use the code below to reset your password. It expires in <strong>15 minutes</strong>.`)}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="background:#f5f5f5; border-left:3px solid #1a1a2e; padding:16px 24px;">
          <p style="margin:0; font-size:32px; font-weight:700; letter-spacing:8px; color:#1a1a2e; font-family:monospace;">${resetCode}</p>
        </td>
      </tr>
    </table>

    ${button(link, "Reset Password")}
    ${note("If you didn't request this, you can safely ignore this email.")}
  `;

  sendMail({
    emailTo: email,
    subject: "Password Reset – ArtStore",
    message: baseLayout("Password Reset", content),
  });
};

// ─── Order Confirmation Email ─────────────────────────────────────────────────

export const sendEmailPersonBookedArts = (email, name, orderDetails) => {
  const content = `
    ${heading("Order confirmed.")}
    ${body(`Hi ${name}, your order has been placed. We'll start processing it right away.`)}

    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8e8e8; border-bottom:1px solid #e8e8e8; margin:0 0 28px; padding:20px 0;">
      <tr>
        <td style="font-size:13px; color:#888888; padding:4px 0;">Items</td>
        <td align="right" style="font-size:13px; color:#1a1a2e; font-weight:700;">${orderDetails.totalItems} item${orderDetails.totalItems > 1 ? "s" : ""}</td>
      </tr>
      <tr>
        <td style="font-size:13px; color:#888888; padding:8px 0 4px;">Total</td>
        <td align="right" style="font-size:16px; color:#1a1a2e; font-weight:700;">${orderDetails.totalPrice.toLocaleString()} FRW</td>
      </tr>
    </table>

    <p style="margin:0 0 12px; font-size:11px; color:#aaaaaa; text-transform:uppercase; letter-spacing:2px; font-weight:700;">Pay via</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="49%" style="border:1px solid #e8e8e8; padding:14px 16px; vertical-align:top;">
          <p style="margin:0 0 6px; font-size:11px; color:#aaaaaa; text-transform:uppercase; letter-spacing:1px;">MTN MoMo</p>
          <p style="margin:0 0 4px; font-size:15px; font-weight:700; color:#1a1a2e;">1380096</p>
          <p style="margin:0; font-size:12px; color:#888888;">0785 161 508</p>
        </td>
        <td width="2%"></td>
        <td width="49%" style="border:1px solid #e8e8e8; padding:14px 16px; vertical-align:top;">
          <p style="margin:0 0 6px; font-size:11px; color:#aaaaaa; text-transform:uppercase; letter-spacing:1px;">Airtel Money</p>
          <p style="margin:0 0 4px; font-size:15px; font-weight:700; color:#1a1a2e;">1380096</p>
          <p style="margin:0; font-size:12px; color:#888888;">0725 161 508</p>
        </td>
      </tr>
    </table>

    ${note("We'll notify you once your items are shipped. Thank you for shopping with us.")}
  `;

  sendMail({
    emailTo: email,
    subject: "Order Confirmed – ArtStore",
    message: baseLayout("Order Confirmation", content),
  });
};

// ─── Artist Approval Email ────────────────────────────────────────────────────

export const sendEmailApproveArts = (email, name, role, updatedAt) => {
  const content = `
    ${heading("You've been approved.")}
    ${body(`Hi ${name}, your application to join ArtStore as a <strong>${role}</strong> has been approved. You can now access your dashboard and start showcasing your work.`)}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td style="border-left:3px solid #1a1a2e; padding:10px 16px;">
          <p style="margin:0; font-size:12px; color:#888888;">Approved on ${formatDate(updatedAt)}</p>
        </td>
      </tr>
    </table>

    ${button("https://artfinderandexhibition.netlify.app", "Go to Dashboard")}
    ${note("Welcome to the ArtStore family.")}
  `;

  sendMail({
    emailTo: email,
    subject: "Application Approved – ArtStore",
    message: baseLayout("Artist Approval", content),
  });
};

// ─── Admin Approval Email ─────────────────────────────────────────────────────

export const sendEmailAdminApproveArts = (email, name, updatedAt) => {
  const content = `
    ${heading("Admin access granted.")}
    ${body(`Hi ${name}, your admin access on ArtStore has been granted. You now have full administrative privileges on the platform.`)}

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td style="border-left:3px solid #1a1a2e; padding:10px 16px;">
          <p style="margin:0; font-size:12px; color:#888888;">Access granted on ${formatDate(updatedAt)}</p>
        </td>
      </tr>
    </table>

    ${button("https://artfinderandexhibition.netlify.app", "Go to Admin Dashboard")}
    ${note("Please ensure all actions comply with ArtStore's platform guidelines.")}
  `;

  sendMail({
    emailTo: email,
    subject: "Admin Access Granted – ArtStore",
    message: baseLayout("Admin Approval", content),
  });
};