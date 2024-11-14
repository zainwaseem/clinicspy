// emailTemplates.js

// Function to generate the subscription purchase confirmation email HTML
const subscriptionPurchaseEmailTemplate = (user) => {
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
        color: #fff;
        text-decoration: none;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #1ABBD9;
        color: #fff;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome ${user.name}!</h1>

      <p>Thank you for subscribing to <strong>ClinicSpy</strong>!</p>

      <p>We’re thrilled to have you as part of our community. With your subscription, you now have full access to all the advanced SEO audit tools and premium features.</p>

      <p>Feel free to start exploring and improving your clinic's online performance using our tools. If you need any assistance or have any questions, don't hesitate to reach out to our support team.</p>

      <a href="https://staging.clinicspy.com/" class="button" target="_blank">Open</a>

      <p>We look forward to helping you succeed!</p>

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

module.exports = { subscriptionPurchaseEmailTemplate };
