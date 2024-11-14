"use client";

import React from "react";
import { Link } from "lucide-react"; // Using Lucide icon for dropdown
// import { ChevronDown, Link } from "lucide-react"; // Using Lucide icon for dropdown
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { LockKeyhole } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore"; // Assuming you store auth info here
import { useRouter } from "next/navigation"; // For redirection

// disable eslint warning
/* eslint-disable */
const OverviewSection = ({
  domain,
  scrapedData,
}: {
  domain: any;
  scrapedData: any;
}) => {
  const user: any = useAuthStore((state) => state.user);
  const router = useRouter();

  // Check if the user is subscribed and has paid access
  const hasAccess =
    user && user?.isSubscribed && user?.subscriptionStatus === "paid";

  // If the user does not have access, redirect them to the payment page
  const handleRedirectToPricing = () => {
    router.push("/pricing"); // Redirect to your pricing or payment page
  };

  const organicValue =
    (Array.isArray(scrapedData) &&
      scrapedData[0]?.Organic_search_traffic_Value) ||
    50;
  const paidValue =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Paid_Search_traffic_Value) ||
    1;
  const organicTraffic =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Organic_Traffic) ||
    "N/A";
  const organicKeywords =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Organic_Keywords) ||
    "N/A";
  const paidSearchTraffic =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Paid_Search_traffic_Value) ||
    "N/A";
  const authorityScore =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Authority_Value) ||
    "N/A";
  const semrushRank =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Semrush_Domain_Rank_Value) ||
    "N/A";
  const backlinks =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.BackLinks_Value) ||
    "N/A";
  const referringDomains =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.Referring_Domains) ||
    "N/A";
  const followLinks =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.follow_links) ||
    "N/A";
  const nofollowLinks =
    (Array.isArray(scrapedData) &&
      scrapedData !== null &&
      scrapedData[0]?.nofollow_links) ||
    "N/A";

  if (!hasAccess) {
    return (
      <div className="container mx-auto text-center py-5">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Unlock SEO and Overview Data
          </h2>
          <p className="text-gray-500 mb-6">
            Upgrade to access full insights on your website's SEO performance
            and detailed monthly overview.
          </p>
          <button
            onClick={handleRedirectToPricing}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex items-center lg:flex-row flex-col justify-between p-4">
        {/* Left Section: Title and URL */}
        <div className="flex items-center space-x-4">
          <h2 className="lg:text-lg text-sm font-semibold text-black">
            Monthly URL Overview
            <span className="ps-4">–</span>
          </h2>
          <div>
            {domain && domain?.query && typeof domain?.query === "string" ? (
              <Link
                href="#"
                target="_blank"
                className="text-primary hover:underline"
              >
                {domain.query}
              </Link>
            ) : (
              <p className="text-gray-500">No URL available</p>
            )}
          </div>
        </div>

        {/* Right Section: Dropdown Button */}
        <div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center bg-primary text-white px-6 py-2 rounded-full">
              <DropdownMenuLabel>Monthly</DropdownMenuLabel>
              <ChevronDown className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Weekly</DropdownMenuItem>
              <DropdownMenuItem>Monthly</DropdownMenuItem>
              <DropdownMenuItem>Quarterly</DropdownMenuItem>
              <DropdownMenuItem>Yearly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {/* Card Section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 p-4">
          {/* Organic Search (SEO) Card */}
          <div className="bg-white shadow-sm flex justify-between flex-col rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
              Organic Search (SEO)
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Column: Organic Keywords */}
              <div className="text-center border-r border-gray-200">
                <p className="text-gray-500 py-3 text-sm flex items-center justify-center">
                  Organic Keywords
                  <span className="ml-1 text-gray-400 cursor-pointer">
                    <i className="fas fa-info-circle bg-gray-200">i</i>
                  </span>
                </p>
                <p className="text-2xl font-bold py-3">{organicKeywords}</p>
                <p className="text-primary cursor-pointer hover:underline">
                  view more
                </p>
              </div>

              {/* Right Column: Monthly Est SEO Clicks */}
              <div className="text-center">
                <p className="text-gray-500 py-3 text-sm flex items-center justify-center">
                  Monthly Est SEO Clicks
                  <span className="ml-1 text-gray-400 cursor-pointer">
                    <i className="fas fa-info-circle bg-gray-200 rounded-full">
                      i
                    </i>
                  </span>
                </p>
                <p className="text-2xl font-bold py-3">{organicTraffic}</p>
                <p className="text-primary cursor-pointer hover:underline">
                  view more
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500 flex items-center">
                Monthly SEO Clicks Value
                <span className="ml-1 text-gray-400 cursor-pointer">
                  <i className="fas fa-info-circle bg-gray-200 rounded-full">
                    i
                  </i>
                </span>
              </p>
              <p className="text-xl font-bold">{authorityScore}</p>
            </div>
          </div>

          {/* Google Inbound Clicks (Organic vs Paid) Card */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                Google’s Inbound Clicks - Organic vs. Paid
              </h3>
              <span className="text-gray-400 cursor-pointer">
                <i className="fas fa-info-circle"></i>
              </span>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <span className="text-teal-400 text-sm">Organic</span>
                  <p className="text-2xl font-semibold">{organicTraffic}</p>
                  <span className="text-sm text-gray-500">99%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-purple-500 text-sm">Paid</span>
                  <p className="text-2xl font-semibold">{paidSearchTraffic}</p>
                  <span className="text-sm text-gray-500">1%</span>
                </div>
              </div>

              <div className="flex items-center justify-center relative w-32 h-32">
                <CircularProgressbar
                  value={organicValue}
                  strokeWidth={8}
                  styles={buildStyles({
                    textSize: "0px",
                    pathColor: "#3FC8E4",
                    trailColor: "#E5E7EB",
                  })}
                />
                <CircularProgressbar
                  value={paidValue}
                  strokeWidth={8}
                  styles={buildStyles({
                    textSize: "0px",
                    pathColor: "#8B5CF6",
                    trailColor: "transparent",
                  })}
                  className="absolute top-4 left-0 w-24 h-24"
                />
              </div>
            </div>
          </div>

          {/* Paid Search (Google Ads) Card */}
          <div className="bg-white shadow-sm flex justify-between flex-col rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
              Paid Search (Google Ads)
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center border-r border-gray-200">
                <p className="text-gray-500 py-3 text-sm flex items-center justify-center">
                  Backlinks
                  <span className="ml-1 text-gray-400 cursor-pointer">
                    <i className="fas fa-info-circle bg-gray-200 ">i</i>
                  </span>
                </p>
                <p className="text-2xl font-bold py-3">{backlinks}</p>
                <p className="text-primary cursor-pointer hover:underline">
                  view more
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-500 py-3 text-sm flex items-center justify-center">
                  Referring Domains
                  <span className="ml-1 text-gray-400 cursor-pointer">
                    <i className="fas fa-info-circle bg-gray-200 rounded-full">
                      i
                    </i>
                  </span>
                </p>
                <p className="text-2xl font-bold py-3">{referringDomains}</p>
                <p className="text-primary cursor-pointer hover:underline">
                  view more
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500 flex items-center">
                Semrush Domain Rank
                <span className="ml-1 text-gray-400 cursor-pointer">
                  <i className="fas fa-info-circle bg-gray-200 rounded-full">
                    i
                  </i>
                </span>
              </p>
              <p className="text-xl font-bold">{semrushRank}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500 flex items-center">
                Follow Links
                <span className="ml-1 text-gray-400 cursor-pointer">
                  <i className="fas fa-info-circle bg-gray-200 rounded-full">
                    i
                  </i>
                </span>
              </p>
              <p className="text-xl font-bold">{followLinks}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500 flex items-center">
                Nofollow Links
                <span className="ml-1 text-gray-400 cursor-pointer">
                  <i className="fas fa-info-circle bg-gray-200 rounded-full">
                    i
                  </i>
                </span>
              </p>
              <p className="text-xl font-bold">{nofollowLinks}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewSection;
