import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play } from "lucide-react";
import avatar from "@/assets/svgs/avatar.svg";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Pagination from "@/components/Pagination"; // Assuming you have a Pagination component
import { useToast } from "@/hooks/use-toast";

// disable eslint warning
/* eslint-disable */
const SiteReviews = ({ reviews }: { reviews: any }) => {
  const { toast } = useToast();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Define how many reviews you want per page

  const totalPages = Math.ceil(reviews?.reviews_data?.length / reviewsPerPage);

  // Get the current page reviews
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews =
    reviews &&
    reviews?.reviews_data &&
    reviews?.reviews_data?.slice(startIndex, endIndex);

  function handleVoice(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Fetch available voices
      const voices = window.speechSynthesis.getVoices();

      // Set a default voice, if available
      if (voices.length > 0) {
        utterance.voice = voices[0]; // You can choose a specific voice if needed
      }

      // Set voice properties if required (optional)
      utterance.pitch = 1; // Default pitch
      utterance.rate = 1; // Default speed
      utterance.volume = 1; // Default volume

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech synthesis is not supported in this browser.",
        variant: "destructive",
      });
    }
  }

  if (reviews && reviews?.reviews_data?.length === 0) {
    return <div>No reviews found</div>;
  }
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-xl font-semibold">Reviews – </h2>
        <Link href="#" target="_blank" className="text-primary hover:underline">
          {reviews && reviews?.name && reviews?.name}
        </Link>
      </div>

      <Table className="w-full bg-white shadow-sm overflow-hidden">
        <TableHeader>
          <TableRow className="bg-primary/10">
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Play</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReviews &&
            currentReviews?.map((row: any, index: any) => (
              <TableRow key={index} className="border-none">
                <TableCell className="py-4">
                  <Image
                    width={50}
                    height={45}
                    src={row?.author_image || avatar}
                    alt={row?.author_title || ""}
                    className="w-12 h-12 rounded-full"
                  />
                </TableCell>

                <TableCell className="py-4">
                  <Link
                    href={row?.author_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {row?.author_title || ""}
                  </Link>
                </TableCell>

                <TableCell className="py-4">
                  {row?.review_rating || 0} ⭐
                </TableCell>

                <TableCell className="py-4">
                  {new Date(row?.review_datetime_utc).toLocaleDateString() ||
                    ""}
                </TableCell>

                <TableCell className="py-4">{row?.review_likes || 0}</TableCell>

                <TableCell className="py-4 flex items-center space-x-2">
                  {/* Tooltip wrapping the truncated review text */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="truncate min-w-[400px] mt-2 max-w-[600px]">
                          {(row &&
                            row?.review_text &&
                            row?.review_text?.slice(0, 120)) ||
                            ""}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-primary text-white p-3 rounded-lg shadow-lg max-w-xs">
                        <p className="whitespace-normal break-words">
                          {row && row?.review_text && row?.review_text}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Play button to trigger voice synthesis */}
                </TableCell>
                <TableCell>
                  <Play
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      handleVoice(row && row?.review_text && row?.review_text)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={reviews?.reviews_data?.length}
          onNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
      </div>
    </section>
  );
};

export default SiteReviews;
