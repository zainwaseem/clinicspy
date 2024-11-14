"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import OverviewSection from "./OverviewSection";
import Tabs from "./Tabs";
import WebVitals from "./WebVitals";
import PerformanceSection from "./PerformanceSection";
import Competitors from "./Competitors";
import InboundLinks from "./InboundLinks";
import ClinicProfile from "./ClinicProfile";
import SocialMediaSection from "./SocialMediaSection";
// import scrapedData from "../utils/scrapedData.json";
import TopPages from "./TopPages";
import SocialMediaStats from "./SocialMediaStats";
import Footer from "./Footer";
import { Toaster } from "./ui/toaster";
import { RiseLoader } from "react-spinners";
import SiteReviews from "./Reviews";
import Contacts from "./Contacts";
import KeywordsTable from "./KeywordsTable";
import TrafficComparisonChart from "./TrafficComparisonChart";
import useAuthStore from "@/stores/useAuthStore";
import baseURL from "@/utils/baseURL";
import FAQs from "./FAQs";
import SearchInfo from "./SearchInformation";
import RelatedSearchTable from "./RelatedSearchTable";
import TrafficComparisonTable from "./TrafficComparisonTable";

const Header = () => {
  // disable eslint
  /* eslint-disable */
  const user: any = useAuthStore((state) => state.user);

  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [serphouseResults, setSerphouseResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // disable eslint warning
  /* eslint-disable */
  const [results, setResults] = useState<any>(null);
  const [premiumContent, setPremiumContent] = useState<any>(null);

  const [deviceType, setDeviceType] = useState("Mobile");
  const [inboundLoading, setInboundLoading] = useState(false);

  const handleTabChange = async (tab: string) => {
    setDeviceType(tab);
    setInboundLoading(true); // Show loading indicator
    setSerphouseResults(null); // Reset previous results
    await fetchSerphouseData(); // Call the API
  };

  const fetchSerphouseData = async () => {
    try {
      const serphouseResponseResult = await axios.get(
        `${baseURL}/api/search?q=${url}&domain=google.com&lang=en&device=${deviceType}&serp_type=web&loc=Alba,Texas,United States&loc_id=1026201&verbatim=0&gfilter=0&page=1&num_result=10`,
        {
          headers: {
            Authorization:
              "Bearer bhkOWgLJ95JdvmEmVj0ALyMPZ7ztdLQckofSrU4QWtEYftvxr6rHTfM7jt3Y",
          },
        }
      );

      setSerphouseResults(serphouseResponseResult.data.results);
      setInboundLoading(false); // Hide loading indicator
    } catch (error) {
      console.log("Error fetching Serphouse data:", error);
      setInboundLoading(false); // Hide loading indicator
      // toast({
      //   title: "Failed to fetch inbound links",
      //   description: "There was an error fetching the data. Please try again.",
      //   variant: "destructive",
      // });
    }
  };
  // useEffect(() => {
  //   if (deviceType) {
  //     fetchSerphouseData(); // Fetch data when deviceType changes
  //   }
  // }, [deviceType]);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("results");
    const storedPremiumContent = sessionStorage.getItem("premiumContent");

    if (storedResults) {
      setResults(JSON.parse(storedResults));
      setShowResults(true);
    }

    if (storedPremiumContent) {
      setPremiumContent(JSON.parse(storedPremiumContent));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults(null);
    setLoading(true);

    let formattedUrl = url.trim();

    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;

    if (!urlRegex.test(formattedUrl)) {
      toast({
        title: "Invalid URL",
        description:
          "Please enter a valid URL with a proper domain (e.g., .com, .net, .org).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("www.")
    ) {
      formattedUrl = `http://www.${formattedUrl}`;
    } else if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = `http://${formattedUrl}`;
    }

    let domain = "";
    try {
      const urlObj = new URL(formattedUrl);
      domain = urlObj.hostname;
    } catch {
      toast({
        title: "Invalid URL",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const data = {
      website: formattedUrl,
      domain: domain,
    };

    try {
      // Run all requests in parallel using Promise.allSettled
      const [responseResult, premiumResponseResult, serphouseResponseResult] =
        await Promise.allSettled([
          // axios.post("http://localhost:5000", data, {
          axios.post("https://eov5cflcw952rbr.m.pipedream.net", data, {
            headers: { "Content-Type": "application/json" },
          }),
          axios.get(`${baseURL}/premium?domain=${domain?.slice(4)}`),
          axios.get(
            `${baseURL}/api/search?q=${domain}&domain=google.com&lang=en&device=desktop&serp_type=web&loc=Alba,Texas,United States&loc_id=1026201&verbatim=0&gfilter=0&page=1&num_result=10`,
            {
              headers: {
                Authorization:
                  "Bearer bhkOWgLJ95JdvmEmVj0ALyMPZ7ztdLQckofSrU4QWtEYftvxr6rHTfM7jt3Y",
              },
            }
          ),
        ]);
      const response =
        responseResult.status === "fulfilled"
          ? responseResult.value.data
          : null;
      const premiumResponse =
        premiumResponseResult.status === "fulfilled"
          ? premiumResponseResult.value.data.data
          : null;
      const serphouseResponse =
        serphouseResponseResult.status === "fulfilled"
          ? serphouseResponseResult.value.data.results
          : null;
      console.log(serphouseResponse);

      // Set state based on successful responses
      if (serphouseResponse) {
        setSerphouseResults(serphouseResponse);
        console.log(serphouseResults);
      }

      if (response) {
        setResults(response);
        sessionStorage.setItem("results", JSON.stringify(response));
      }

      if (premiumResponse) {
        setPremiumContent(premiumResponse);
        sessionStorage.setItem(
          "premiumContent",
          JSON.stringify(premiumResponse)
        );
      }

      if (response || premiumResponse || serphouseResponse) {
        setShowResults(true);
        setSuccessMessage("Your submission was successful.");
        toast({
          title: "Your submission was successful.",
          variant: "default",
        });
      } else {
        toast({
          title: "No data available from the requests.",
          variant: "destructive",
        });
        setShowResults(false);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      toast({
        title: "There was an error submitting the form.",
        variant: "destructive",
      });
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto lg:px-10 p-1 flex flex-col items-center justify-center py-40">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center my-3 text-black md:text-3xl">
          SEO Audit Tool for Healthcare & Wellness Clinics
        </h1>
        <p className="text-gray-500 mt-2 text-center">
          Enter your URL to get a FREE SEO report
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-8 w-full max-w-md"
        >
          {/* Input with Icon */}
          <div className="relative w-full lg:p-0 px-4">
            <span className="absolute left-4 top-3.5 px-1 text-gray-500">
              <Search className="w-5 h-5 text-primary" />
            </span>
            <input
              type="text"
              value={url}
              autoFocus={true}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Website URL"
              className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-100 rounded-lg  focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 py-4 h-12 text-lg lg:w-full font font-semibold rounded-lg  transition-colors"
          >
            Start Free Audit
          </Button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-primary flex justify-start ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="flex justify-start text-start">{successMessage}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center p-5 h-20 mt-5">
            <RiseLoader color="#1ABBD9" />
          </div>
        )}

        {/* disable eslint warning */}
        {/* eslint-disable */}
        {showResults && (
          <>
            {results && (
              <SocialMediaStats
                facebook={results?.facebook}
                instagram={results?.instagram}
                youtube={results?.youtube}
                linkedin={results?.linkedin}
                twitter={results?.twitter}
              />
            )}

            {serphouseResults?.results?.search_information && (
              <SearchInfo
                search_information={
                  serphouseResults?.results?.search_information
                }
              />
            )}

            {results && <SocialMediaSection results={results} />}
            {results && Array.isArray(results?.places) && (
              <ClinicProfile places={results && results?.places} />
            )}
            {results && results?.google_info && (
              <SiteReviews reviews={results?.google_info} />
            )}
            <TopPages socials={results && results?.domain} />
            {results && results?.domain && (
              <Contacts
                emails={results?.domain?.emails}
                external_emails={results?.domain?.external_emails}
                phones={results?.domain?.phones}
              />
            )}
            {premiumContent && (
              <>
                <TrafficComparisonChart premiumContent={premiumContent} />
                <TrafficComparisonTable premiumContent={premiumContent} />
                <KeywordsTable premiumContent={premiumContent} />
              </>
            )}
            {(premiumContent || results) && (
              <Competitors
                scrapedData={premiumContent}
                results={results}
                reviewsPerScore={results?.google_info?.reviews_per_score}
                reviewsTags={results?.google_info?.reviews_tags}
              />
            )}
            {(premiumContent || results) && (
              <OverviewSection
                scrapedData={premiumContent}
                domain={results && results?.domain}
              />
            )}
            <Tabs onTabChange={handleTabChange} />
            {serphouseResults && (
              <>
                <InboundLinks
                  scrapedData={serphouseResults?.results?.organic}
                />
              </>
            )}
            {inboundLoading && (
              <div className="flex justify-center items-center p-5 h-20 mt-5">
                <RiseLoader color="#1ABBD9" />
              </div>
            )}
            {premiumContent && <WebVitals scrapedData={premiumContent} />}
            {premiumContent && (
              <PerformanceSection premiumContent={premiumContent} />
            )}
            {serphouseResults?.results?.related_search && (
              <RelatedSearchTable
                related_search={serphouseResults?.results?.related_search}
              />
            )}
            {serphouseResults?.results?.people_also_ask && (
              <FAQs
                people_also_ask={serphouseResults?.results?.people_also_ask}
              />
            )}
          </>
        )}
      </div>

      <Footer />
      <Toaster />
    </>
  );
};

export default Header;
