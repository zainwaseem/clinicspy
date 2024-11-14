"use client";

import React, { useState } from "react";
import { Button } from "./ui/button"; // Assuming you're using Shadcn's Button component
import Analytics from "./Analytics";

// disable eslint warning
/* eslint-disable */
const SocialMediaTabs = ({ results }: { results: any }) => {
  // Extract only available social media data from results
  let availableTabs = [];
  if (
    results.facebook !== false ||
    results.instagram !== false ||
    results.youtube !== false ||
    results.linkedin !== false ||
    results.twitter !== false
  ) {
    availableTabs = [
      results?.facebook && results.facebook !== false && "Facebook",
      results?.instagram && results.instagram !== false && "Instagram",
      results?.youtube && results.youtube !== false && "YouTube",
      results?.linkedin && results.linkedin !== false && "LinkedIn",
      results?.twitter && results.twitter !== false && "Twitter",
    ]?.filter(Boolean);
  }

  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>(availableTabs[0] || "");

  // Handler to set the active tab
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <section className="text-center py-10">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">
        Integrated Social Media Accounts
      </h2>
      <p className="text-gray-500 mb-6">
        Analyze insights from your connected social media accounts, <br />{" "}
        including performance metrics and detailed insights from your recent
        posts.
      </p>

      {/* Dynamically rendered tabs */}
      <div className="flex justify-center lg:flex-row flex-col space-4">
        {availableTabs &&
          availableTabs?.map((tab) => (
            <Button
              key={tab}
              className={`${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "border-2 border-primary bg-white hover:bg-white text-primary"
              } px-6 py-2 rounded-full transition m-2`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Button>
          ))}
      </div>

      {/* Content for each tab */}
      <div className="mt-8">
        {activeTab === "Facebook" && results?.facebook && (
          <div className="text-gray-500">
            <Analytics
              data={results?.facebook && results?.facebook}
              platform="Facebook"
            />
          </div>
        )}
        {activeTab === "Instagram" && results?.instagram && (
          <div className="text-gray-500">
            <Analytics
              data={results?.instagram && results?.instagram}
              platform="Instagram"
            />
          </div>
        )}
        {activeTab === "YouTube" && results?.youtube && (
          <div className="text-gray-500">
            <Analytics
              data={results.youtube && results.youtube}
              platform="YouTube"
            />
          </div>
        )}
        {activeTab === "LinkedIn" && results?.linkedin && (
          <div className="text-gray-500">
            <Analytics data={results.linkedin} platform="LinkedIn" />
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialMediaTabs;
