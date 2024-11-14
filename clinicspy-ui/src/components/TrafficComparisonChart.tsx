import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LockKeyhole } from "lucide-react"; // Using Lucide lock icon
import useAuthStore from "@/stores/useAuthStore"; // Assuming you store auth info here
import { useRouter } from "next/navigation";

// Custom Legend Renderer
/* eslint-disable */
const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {payload?.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <span
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: entry.color, borderRadius: "50%" }}
          ></span>
          <span className="text-gray-700 text-sm font-medium">
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

// disable eslint warning
/* eslint-disable */
const TrafficComparisonChart = ({
  premiumContent,
}: {
  premiumContent: any;
}) => {
  const user: any = useAuthStore((state) => state.user);
  const router = useRouter();

  // Check if the user is subscribed and has paid access
  const hasAccess =
    user && user?.isSubscribed && user?.subscriptionStatus === "paid";

  // Redirect to the pricing page
  const handleRedirectToPricing = () => {
    router.push("/pricing");
  };

  // Transform the data to match the chart format
  const data =
    (Array.isArray(premiumContent) &&
      premiumContent[4]?.Data?.map((item: any) => ({
        name: item.Competitor,
        ComLevel: Number(item["Com. Level"]),
        ComKeywords: Number(item["Com. Keywords"]),
        SEKeywords: Number(item["SE Keywords"]),
      }))) ||
    [];

  return (
    <div className="container mx-auto p-4 relative">
      <h3 className="text-lg font-semibold mb-2">
        Traffic Analytics: Competitors Comparison Chart (Visits)
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Competitor Analysis | All Devices | Worldwide
      </p>
      {/* Lock Overlay if no access */}
      {!hasAccess && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
          onClick={handleRedirectToPricing}
          style={{ cursor: "pointer" }}
        >
          <LockKeyhole className="w-12 h-12 text-gray-400 opacity-100 transform translate-y-1" />
        </div>
      )}

      {/* Chart Section */}
      <div
        className={`w-full h-[300px] md:h-[400px] ${
          !hasAccess ? "blur-lg pointer-events-none select-none" : ""
        }`}
        onContextMenu={(e) => {
          !hasAccess && e.preventDefault();
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={{ stroke: "#cccccc" }}
              tickLine={{ stroke: "#cccccc" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={{ stroke: "#cccccc" }}
              tickLine={{ stroke: "#cccccc" }}
              width={50}
              label={{
                value: "Keywords",
                angle: -90,
                position: "insideLeft",
                offset: 0,
              }}
              tickFormatter={(value) => `${value}`} // Format values directly
            />
            <Tooltip contentStyle={{ fontSize: "12px" }} />
            <Legend
              verticalAlign="bottom"
              align="center"
              content={renderLegend}
              wrapperStyle={{ paddingTop: "10px" }}
            />
            {/* Map over the data to create dynamic lines for each metric */}
            <Line
              type="monotone"
              dataKey="ComLevel"
              name="Competition Level"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5, fill: "#8884d8" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="ComKeywords"
              name="Common Keywords"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 5, fill: "#82ca9d" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="SEKeywords"
              name="Search Engine Keywords"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 5, fill: "#ff7300" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficComparisonChart;
