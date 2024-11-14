"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";
import { LockKeyhole } from "lucide-react";

// disable eslint
/* eslint-disable */
const PerformanceSection = ({ premiumContent }: { premiumContent: any }) => {
  const user: any = useAuthStore((state) => state.user);
  const router = useRouter();

  // Extracting data from premiumContent for performance and stats
  const performanceValue = parseInt(
    premiumContent[0]?.Organic_search_traffic_Value.split(" ")[0].replace(
      "K",
      "000"
    ),
    10
  );
  const performanceStatValue = parseInt(
    premiumContent[0]?.Paid_Search_traffic_Value.split(" ")[0].replace(
      "K",
      "000"
    ),
    10
  );
  const accessibility = premiumContent[0]?.Organic_Traffic || "N/A";
  const bestPractices = premiumContent[0]?.Organic_Keywords || "N/A";
  const seo = premiumContent[0]?.BackLinks_Value || "N/A";

  // Check if the user is subscribed and the subscription status is 'paid'
  const hasAccess =
    user && user?.isSubscribed && user?.subscriptionStatus === "paid";

  // Function to handle redirect to pricing page
  const handleRedirectToPricing = () => {
    router.push("/pricing");
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Diagnose performance issues
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Card */}
        <div
          className={`bg-white shadow-lg rounded-lg p-6 relative ${
            !hasAccess ? "blur-sm" : ""
          }`}
        >
          {/* Lock Overlay */}
          {!hasAccess && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={handleRedirectToPricing}
              style={{ cursor: "pointer" }}
            >
              <LockKeyhole className="w-16 h-16 text-gray-500 z-10" />
            </div>
          )}
          <div
            className={`relative ${
              !hasAccess ? "blur-lg pointer-events-none select-none" : ""
            }`}
            onContextMenu={(e) => {
              !hasAccess && e.preventDefault();
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <span className="text-red-500 mr-2">🚨</span> Performance
              </h3>
              <span className="text-gray-400 cursor-pointer">
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>

            {/* Progress Circle */}
            <div className="w-32 h-32 mx-auto">
              <CircularProgressbar
                value={performanceValue || 28} // Use performanceValue from the data
                text={`${performanceValue || 28}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#ef4444", // Red path
                  trailColor: "#E5E7EB", // Light grey trail
                  textColor: "#000", // Black text color
                })}
              />
            </div>

            {/* Text Information */}
            <p className="text-center mt-4 text-xl font-semibold">
              Increased 12% from last month
            </p>
            <p className="text-center mt-2 text-sm text-gray-500">
              Values are estimated and may vary. The{" "}
              <Link href="#" className="text-primary hover:underline">
                performance score
              </Link>{" "}
              is calculated directly from these metrics.{" "}
              <Link href="#" className="text-primary hover:underline">
                See calculator.
              </Link>
            </p>
          </div>
        </div>

        {/* Performance Stats Card */}
        <div
          className={`bg-white shadow-lg rounded-lg p-6 relative ${
            !hasAccess ? "blur-sm" : ""
          }`}
        >
          {/* Lock Overlay */}
          {!hasAccess && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={handleRedirectToPricing}
              style={{ cursor: "pointer" }}
            >
              <LockKeyhole className="w-16 h-16 text-gray-500 z-10" />
            </div>
          )}
          <div className={`relative ${!hasAccess ? "blur-lg" : ""}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <span className="text-primary mr-2">📈</span> Performance stats
              </h3>
              <span className="text-gray-400 cursor-pointer">
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>

            {/* Circular Progress Bar */}
            <div className="relative w-40 h-40 mx-auto">
              <CircularProgressbar
                value={performanceStatValue || 14} // Use performanceStatValue from the data
                text={`+${performanceStatValue || 14}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#3B82F6", // Blue for performance stats circle
                  trailColor: "#E5E7EB",
                  textColor: "#3B82F6",
                })}
              />
              <div className="absolute top-1/4 right-1/4 text-red-500 text-sm">
                16%
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Accessibility</span>
                </div>
                <span className="text-black font-semibold">
                  {accessibility}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Best Practices</span>
                </div>
                <span className="text-black font-semibold">
                  {bestPractices}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">SEO</span>
                </div>
                <span className="text-black font-semibold">{seo}</span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-center mt-4 text-xl font-semibold">
              Increased 14% from last month
            </p>
            <p className="text-center mt-2 text-sm text-gray-500">
              Values are estimated and may vary. The{" "}
              <Link href="#" className="text-primary hover:underline">
                performance score
              </Link>{" "}
              is calculated directly from these metrics.{" "}
              <Link href="#" className="text-primary hover:underline">
                See calculator.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
