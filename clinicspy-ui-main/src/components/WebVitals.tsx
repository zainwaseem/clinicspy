import React from "react";
import {
  Calendar,
  Smartphone,
  Users,
  Globe,
  Clock,
  Wifi,
  Circle,
  Info,
} from "lucide-react";
import useAuthStore from "@/stores/useAuthStore"; // Assuming you store auth info here
import { useRouter } from "next/navigation"; // For redirection

/* eslint-disable */
const WebVitals = ({ scrapedData }: { scrapedData: any }) => {
  const user: any = useAuthStore((state) => state.user);
  const router = useRouter();

  // Check if the user is subscribed and has paid access
  const hasAccess =
    user && user?.isSubscribed && user?.subscriptionStatus === "paid";

  // If the user does not have access, redirect them to the payment page
  const handleRedirectToPricing = () => {
    router.push("/pricing"); // Redirect to your pricing or payment page
  };

  // Extract SEO or performance-related data from scrapedData
  const authorityScore = scrapedData[0]?.Authority_Value || "N/A";
  const organicTraffic = scrapedData[0]?.Organic_search_traffic_Value || "N/A";
  const paidTraffic = scrapedData[0]?.Paid_Search_traffic_Value || "N/A";
  const ttfb = "0.7s"; // Example mapping
  const cls = "0.59"; // Hardcoded as per the example

  // Render the payment section if the user does not have access
  if (!hasAccess) {
    return (
      <section className="container mx-auto my-4">
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Unlock Web Vitals and SEO Assessment
          </h2>
          <p className="text-gray-500 mb-6">
            Get detailed insights into your website's performance and SEO with
            our Web Vitals and SEO Assessment.
          </p>
          <button
            onClick={handleRedirectToPricing}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Upgrade to Premium
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto my-4">
      <div className="bg-white shadow-sm rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-primary p-2 rounded-full">
              <Circle className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-semibold">
              Core Web Vitals & SEO Assessment:
            </h3>
            <span className="text-green-600 font-semibold">Passed</span>
          </div>
          <Info className="text-gray-400 mx-1" />
        </div>

        {/* Grid for metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example metric rows */}
          <MetricItem
            label="Cumulative Layout Shift (CLS)"
            value={cls}
            progressColor="bg-red-500"
            statusColor="text-red-500"
          />
          <MetricItem
            label="Time to First Byte (TTFB)"
            value={ttfb}
            progressColor="bg-green-500"
            statusColor="text-green-500"
          />
          <MetricItem
            label="Authority Score"
            value={authorityScore}
            progressColor="bg-green-500"
            statusColor="text-green-500"
          />
          <MetricItem
            label="Organic Search Traffic"
            value={organicTraffic}
            progressColor="bg-green-500"
            statusColor="text-green-500"
          />
          <MetricItem
            label="Paid Search Traffic"
            value={paidTraffic}
            progressColor="bg-blue-500"
            statusColor="text-blue-500"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 mx-auto md:grid-cols-3 gap-6 text-center text-gray-500">
            <FooterItem
              icon={<Calendar className="text-gray-400 w-5 h-5" />}
              label="Latest 28-day collection period"
            />
            <FooterItem
              icon={<Smartphone className="text-gray-400 w-5 h-5 " />}
              label="Various mobile devices"
            />
            <FooterItem
              icon={<Users className="text-gray-400 w-5 h-5 " />}
              label="Many samples (Chrome UX Report)"
            />
            <FooterItem
              icon={<Clock className="text-gray-400 w-5 h-5 " />}
              label="Full visit durations"
            />
            <FooterItem
              icon={<Wifi className="text-gray-400 w-5 h-5 " />}
              label="Various network speeds"
            />
            <FooterItem
              icon={<Globe className="text-gray-400 w-5 h-5 " />}
              label="All Chrome versions"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface MetricItemProps {
  label: string;
  value: string;
  progressColor: string;
  statusColor: string;
}

const MetricItem = ({
  label,
  value,
  progressColor,
  statusColor,
}: MetricItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${statusColor} font-semibold`}>{label}</span>
        <Info className="text-gray-400" />
      </div>
      <div className="flex items-center mt-2">
        <div className={`h-2 flex-1 rounded-full ${progressColor}`}></div>
        <span className="ml-2 text-sm">{value}</span>
      </div>
    </div>
  );
};

const FooterItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex items-center space-x-2 my-2">
      {icon}
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};

export default WebVitals;
