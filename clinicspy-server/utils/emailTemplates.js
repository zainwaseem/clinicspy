// emailTemplates.js

// Function to generate the welcome email HTML
const welcomeEmailTemplate = (user) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
      }
      h1 {
        color: #1ABBD9;
        font-size: 24px;
        font-weight: bold;
      }
      h4 {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        padding: 10px 0;

      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #888;
        text-align: center;
      }
      a{
        color: #1ABBD9;
        text-decoration: none;
}

    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hello ${user.name},</h1>

      <h4>Welcome to 
      <a href="https://staging.clinicspy.com/" target="_blank">
      <strong>ClinicSpy</strong>
      </a> We're thrilled to have you on our SEO audit platform.</h4>

      <p>Thank you for registering ${user.email} with ClinicSpy.</p>


      <p>Best regards,<br>
      <strong>ClinicSpy Team</strong></p>

      <div class="footer">
        <p>© 2024 ClinicSpy | All Rights Reserved</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = { welcomeEmailTemplate };
