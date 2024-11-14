import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, LockKeyhole } from "lucide-react";
import Link from "next/link";
import React from "react";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

// disable eslint warning
/* eslint-disable */
const Competitors = ({
  scrapedData,
  results,
  reviewsPerScore,
  reviewsTags,
}: {
  scrapedData: any;
  results: any;
  reviewsPerScore: any;
  reviewsTags: any;
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

  // Safely handle cases where reviewsPerScore or reviewsTags may be undefined or null
  const safeReviewsPerScore = reviewsPerScore ?? {};
  const safeReviewsTags = reviewsTags ?? [];

  // Avoid crashing the app by ensuring reviewsPerScore is an object
  const reviewScores = Object.entries(safeReviewsPerScore).map(
    ([score, count]) => ({
      score,
      count,
    })
  );

  const competitors =
    (Array.isArray(scrapedData) &&
      scrapedData.find(
        (section: any) => section?.Title === "Main Organic Keywords"
      )?.Data) ||
    [];
  return (
    <section className="container mx-auto px-4 py-8 relative ">
      {/* Lock Overlay if no access */}
      {!hasAccess && (
        <div
          className="absolute inset-0 flex items-center justify-center "
          onClick={handleRedirectToPricing}
          style={{
            cursor: "pointer",
          }}
        >
          <LockKeyhole className="w-12 h-12 text-gray-400 opacity-100 transform translate-y-1" />
        </div>
      )}

      {/* Content Section */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-semibold">Uncover key competitors –</h2>
          <Link
            href="#"
            target="_blank"
            className="text-primary hover:underline"
          >
            {results?.domain?.query || "No domain available"}
          </Link>
        </div>

        <div
          className={`${
            !hasAccess ? "blur-lg pointer-events-none select-none" : ""
          } grid grid-cols-1 md:grid-cols-2 gap-6`}
          onContextMenu={(e) => {
            !hasAccess && e.preventDefault();
          }}
        >
          {/* Top Competitors Table */}
          <div className="bg-white shadow-sm rounded-lg lg:p-6 p-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Top Competitors</h3>
              <span className="text-gray-400">
                <i className="fas fa-info-circle"></i>
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitors</TableHead>
                  <TableHead>Organic Traffic</TableHead>
                  <TableHead>DA (Competition Level)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors &&
                  competitors?.map((competitor: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link
                          href={`https://${competitor?.Competitor}`} // Assuming competitor site is the domain
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center space-x-1"
                        >
                          <span>{competitor?.Competitor}</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="relative w-full h-2 bg-gray-300 rounded-full">
                          <div
                            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                competitor["SE Keywords"],
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>{competitor?.["Com. Level"]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Keyword Opportunities Table */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Reviews Keywords</h3>
              <span className="text-gray-400">
                <i className="fas fa-info-circle"></i>
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeReviewsTags?.length > 0 ? (
                  safeReviewsTags?.map((keyword: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{keyword}</TableCell>
                      <TableCell>
                        {String(reviewScores[index]?.score ?? "N/A")}
                      </TableCell>
                      <TableCell>
                        {String(reviewScores[index]?.count ?? "N/A")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No keywords available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competitors;
