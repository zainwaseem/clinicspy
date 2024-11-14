const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../models/user.model");

exports.createCheckoutSession = async (req, res) => {
  console.log(req.user._id.toString());

  console.log(req.body.userId);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1Q8FoCHTJloAIktALbONDDN0",
          quantity: 1,
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: req.user._id.toString(),
      },
      subscription_data: {
        metadata: {
          userId: req.user._id.toString(),
        },
      },
      success_url: "https://clinicspy.com/success",
      cancel_url: "https://clinicspy.com/cancel",
    });

    res.json({
      url: session.url,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isSubscribed: user.isSubscribed,
        subscriptionId: user.subscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
        subscriptionStartDate: user.subscriptionStartDate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
