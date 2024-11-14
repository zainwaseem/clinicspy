const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe.controller");
const protect = require("../middleware/auth");
const User = require("../models/user.model");
const {
  subscriptionPurchaseEmailTemplate,
} = require("../utils/subscriptionPurchaseEmailTemplate");
const sendEmail = require("../utils/emailService");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
require("dotenv").config();

const router = express.Router();

// Stripe Checkout Session for Subscription
router.post("/create-checkout-session", protect, createCheckoutSession);

// Stripe webhook handler
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event = req.body;
    const sig = req.headers["stripe-signature"];
    let endpointSecret = "whsec_0GLd9lGeNoYyclLymELygnVhHrHhBdsZ";
    try {
      // Use the raw body for signature verification
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message); // Log detailed error
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle subscription created
    if (event.type === "customer.subscription.created") {
      const subscription = event.data.object;
      console.log("Subscription created:", subscription.id);
    }

    // Handle successful payment for the subscription
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object;
      const userId = invoice?.subscription_details?.metadata?.userId; // Ensure metadata is available
      console.log(userId);

      if (!userId) {
        console.error("No userId in invoice metadata");
        return res.status(400).json({ error: "No userId in invoice metadata" });
      }

      try {
        // Update the user subscription status in the database
        const user = await User.findByIdAndUpdate(userId, {
          isSubscribed: true,
          subscriptionId: invoice.subscription,
          subscriptionStartDate: new Date(
            invoice.lines.data[0].period.start * 1000
          ),
          subscriptionEndDate: new Date(
            invoice.lines.data[0].period.end * 1000
          ),
          subscriptionStatus: invoice.status,
        });
        await sendEmail(
          user.email,
          "Subscription Purchase",
          subscriptionPurchaseEmailTemplate(user)
        );
        console.log(`User ${user.email} subscribed successfully`);
      } catch (error) {
        console.error("Error updating user subscription status:", error);
        return res
          .status(500)
          .json({ error: "Failed to update subscription status" });
      }
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
  }
);

module.exports = router;
