const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.clinicspy.com",
  port: 465,
  secure: true,

  auth: {
    user: "contact@clinicspy.com",
    pass: "Wa4t3r15L1f3Ya!",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: '"ClinicSpy" <contact@clinicspy.com>',
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
