const axios = require("axios");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const stripeRoutes = require("./routes/stripe.routes");
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const User = require("./models/user.model");
const sendEmail = require("./utils/emailService");

const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const {
  subscriptionExpiredEmailTemplate,
} = require("./utils/subscriptionExpiredEmailTemplate");

const app = express();

dotenv.config();

connectDB();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.json());

app.use("/", stripeRoutes);

app.use(express.json());

app.use("/api", userRoutes);

app.post("/", async (req, res) => {
  const data = req.body;
  // Validate URL
  if (!isValidUrl(data.website)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // Parse domain from URL
  let domain;

  try {
    const urlObj = new URL(data.website);
    domain = urlObj.host;
  } catch (error) {
    domain = data.website;
  }

  data.domain = domain;

  // Execute wget command
  const wgetCommand = `wget -P results/ -N --mirror --convert-links --adjust-extension --page-requisites --no-parent --restrict-file-names=windows --domains=${domain} ${data.website} > /dev/null 2>&1 &`;
  exec(wgetCommand, (error) => {
    if (error) {
      console.error(`Error executing wget: ${error}`);
      return res.status(500).json({ error: "Error downloading website" });
    }
  });
  try {
    const response = await axios.post(
      "https://eov5cflcw952rbr.m.pipedream.net",
      data,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 55000,
      }
    );

    // Save the result in a file
    const resultFilePath = path.join(
      __dirname,
      "results",
      domain,
      "PIPEDREAM.json"
    );
    fs.mkdirSync(path.dirname(resultFilePath), { recursive: true });
    fs.writeFileSync(resultFilePath, JSON.stringify(response.data));

    // Respond with the result
    res.json(response.data);
  } catch (error) {
    console.error("Error sending data to Pipedream:", error);
    res.status(500).json({ error: "Error sending data to Pipedream" });
  }
});

// Utility function to validate URLs
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}

app.get("/", (req, res) => {
  res.send("Clinic Spy Server");
});

app.get("/premium", async (req, res) => {
  const domain = req.query.domain;

  const cachedResponse = cache.get(domain);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  try {
    const response = await axios.get(
      `http://107.174.231.210:3000/api/scrape/semrush?domain=${domain}`
    );

    cache.set(domain, response.data);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching premium data" });
  }
});

// Serphouse Routes
// GET
app.get("/api/search", async (req, res) => {
  const {
    q,
    domain,
    lang,
    device,
    serp_type,
    loc,
    loc_id,
    verbatim,
    gfilter,
    page,
    num_result,
  } = req.query;

  // Configure the request to the Serphouse API
  const config = {
    method: "get",
    url: `https://api.serphouse.com/serp/live`,
    params: {
      q,
      domain,
      lang,
      device,
      serp_type,
      loc,
      loc_id,
      verbatim,
      gfilter,
      page,
      num_result,
    },
    headers: {
      Authorization:
        "Bearer bhkOWgLJ95JdvmEmVj0ALyMPZ7ztdLQckofSrU4QWtEYftvxr6rHTfM7jt3Y",
    },
  };

  try {
    // Make the request to Serphouse API
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching search results",
      details: error.message,
    });
  }
});

// POST
app.post("/api/search", async (req, res) => {
  // Extract parameters from the request body
  const {
    q,
    domain,
    lang,
    device,
    serp_type,
    loc,
    loc_id,
    verbatim,
    gfilter,
    page,
    num_result,
  } = req.body;

  // Check if the required parameters are provided
  if (!q || !domain || !lang || !device || !serp_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Configure the request to the Serphouse API
  const config = {
    method: "post",
    url: "https://api.serphouse.com/serp/live",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer bhkOWgLJ95JdvmEmVj0ALyMPZ7ztdLQckofSrU4QWtEYftvxr6rHTfM7jt3Y", // Replace with your actual API key
    },
    data: JSON.stringify({
      data: {
        q,
        domain,
        lang,
        device,
        serp_type,
        loc,
        loc_id,
        verbatim,
        gfilter,
        page,
        num_result,
      },
    }),
  };

  try {
    // Make the request to Serphouse API
    const response = await axios(config);
    // Send the data from the API response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data
      : "An error occurred while fetching search results";
    res.status(status).json({ error: message });
  }
});

// axesso
app.get("/instagram/account-info", async (req, res) => {
  const { url } = req.query;

  // Check if the URL parameter is provided
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Make a request to the Axesso Instagram API
    const response = await axios.get(
      `http://api.axesso.de/ins/instagram-account-info`,
      {
        params: { url },
      }
    );

    // Return the API response
    res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors from the Axesso API request
    console.error("Error fetching Instagram account info:", error.message);
    res.status(500).json({ error: "Failed to fetch Instagram account info" });
  }
});

// Checking each user subscription status daily
cron.schedule("0 0 * * *", async () => {
  cache.flushAll();
  const currentDate = new Date();
  try {
    const users = await User.find({
      subscriptionEndDate: { $lte: currentDate },
      subscriptionStatus: "paid",
    });

    // Update the subscription status and isSubscribed fields
    for (const user of users) {
      user.subscriptionStatus = "unpaid";
      user.isSubscribed = false;
      user.updatedAt = new Date();

      await user.save();

      console.log(`Updated subscription for user: ${user.name}`);
      const emailContent = subscriptionExpiredEmailTemplate(user);

      await sendEmail(
        user.email,
        "Subscription Expired - Please Renew",
        emailContent
      );
    }
  } catch (error) {
    console.error("Error updating subscriptions:", error);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
