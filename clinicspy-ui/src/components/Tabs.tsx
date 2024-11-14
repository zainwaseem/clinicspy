"use client";
import React, { useState } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react"; // Importing icons

const Tabs = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  const [activeTab, setActiveTab] = useState("mobile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center p-6 space-y-4 md:space-y-0">
      {/* Title */}
      <h2 className="lg:text-xl text-lg font-semibold text-center ">
        Discover what your real users are experiencing
      </h2>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4">
        <button
          onClick={() => handleTabClick("mobile")}
          className={`flex items-center space-x-1 ${
            activeTab === "mobile" ? "text-primary" : "text-gray-500"
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span>Mobile</span>
        </button>

        <button
          onClick={() => handleTabClick("tablet")}
          className={`flex items-center space-x-1 ${
            activeTab === "tablet" ? "text-primary" : "text-gray-500"
          }`}
        >
          <Tablet className="w-5 h-5" />
          <span>Tablet</span>
        </button>

        <button
          onClick={() => handleTabClick("desktop")}
          className={`flex items-center space-x-1 ${
            activeTab === "desktop" ? "text-primary" : "text-gray-500"
          }`}
        >
          <Monitor className="w-5 h-5" />
          <span>Desktop</span>
        </button>
      </div>
    </div>
  );
};

export default Tabs;
