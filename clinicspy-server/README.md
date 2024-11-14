# ClinicSpy SEO Audit Tool - Backend

This is the **backend** part of the ClinicSpy SEO Audit Tool. It provides APIs for fetching website audit data, handling user subscriptions, and integrating external APIs (e.g., Pipedream for fetching SEO metrics).

## Features

- API for performing SEO audits
- Integration with Stripe for handling subscriptions
- User subscription management
- Daily cron jobs to check user subscription status

## Tech Stack

- **Node.js** with **Express.js** for backend APIs
- **MongoDB** for user and subscription data
- **Stripe** for payment processing
- **Axios** for external API requests
- **Cron Jobs** for scheduled tasks

## Prerequisites

- **Node.js** (>= v20)
- **MongoDB** (local or remote instance)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zainwaseem/clinicspy-server.git
cd clinicspy-server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```
MONGO_URI=mongodb://localhost:27017/clinicspy

```

4. Run the server:

```bash
node server.js
```

5. The backend will be available at [http://localhost:5000](http://localhost:5000).

## Project Structure

```bash
├── config/              # Database connection and configuration files
├── controllers/         # API controllers handling logic
├── models/              # Mongoose models for MongoDB
├── routes/              # Express routes
├── utils/               # Utility functions (e.g., email service, caching)
├── index.js            # Entry point for the Node.js server
├── .env                 # Environment variables for backend
```

## Cron Jobs

A cron job runs daily to check the subscription status of users and send subscription expiration emails.

## License

Licensed under the MIT License.

---
