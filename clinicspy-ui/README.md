# ClinicSpy SEO Audit Tool - Frontend

**ClinicSpy** provides a free SEO audit tool for Healthcare & Wellness Clinics to analyze and optimize their website performance. This is the **frontend** part of the application built using **Next.js**.

## Features

- SEO Audits for websites
- Traffic analysis (organic and paid)
- Competitor analysis
- Social media performance insights
- Google reviews integration
- Core Web Vitals analysis
- Responsive design

## Tech Stack

- **Next.js**
- **Tailwind CSS** for styling
- **React** for client-side rendering
- **Axios** for API requests
- **ShadCN UI** for UI components
- **React Toasts** for notifications
- **React Spinners** for loading indicators

## Prerequisites

- **Node.js** (>= v20)
- **NPM** or **Yarn**
- **Redis** (optional, for caching)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/zainwaseem/clinicspy-ui.git
cd clinicspy-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

````

4. Run the development server:

```bash
npm run dev
# or
yarn dev
````

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```bash
├── components/          # Reusable components (e.g. SEO Audit components, tables)
├── pages/               # Next.js pages (e.g., index, audit results, pricing)
├── public/              # Static assets (images, fonts)
├── styles/              # Global styles using Tailwind CSS
├── utils/               # Utility functions and constants
└── .env.local           # Environment variables for frontend
```

## License

Licensed under the MIT License.

---
