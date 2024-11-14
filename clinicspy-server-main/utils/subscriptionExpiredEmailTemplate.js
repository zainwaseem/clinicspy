// emailTemplates.js

// Function to generate the subscription expiration email HTML
const subscriptionExpiredEmailTemplate = (user) => {
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
        color: #1ABBD9;
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
      <h1>Hello ${user.name},</h1>

      <p>Your subscription to <strong>ClinicSpy</strong> has expired.</p>

      <p>Please renew your subscription to continue enjoying our SEO services and access to all the advanced features of the platform.</p>

      <a href="https://staging.clinicspy.com/pricing" class="button" target="_blank">Renew Subscription</a>

      <p>If you have any questions or need assistance, feel free to contact us.</p>

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

module.exports = { subscriptionExpiredEmailTemplate };
