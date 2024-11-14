import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// Disable eslint warning
/* eslint-disable */
const InboundLinks = ({
  scrapedData,
}: {
  scrapedData: Array<{
    position: number;
    site_title: string;
    title: string;
    link: string;
    displayed_link: string;
    cached_page: string | null;
    snippet: string;
  }>;
}) => {
  // Map inbound links from scrapedData
  const inboundLinks = scrapedData.map((item) => ({
    link: item.link,
    title: item.title,
    displayedLink: item.displayed_link,
    snippet: item.snippet,
    position: item.position,
  }));

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-xl font-semibold">Inbound Links (Back Links) –</h2>
        <span>{scrapedData[0]?.site_title || "No title available"}</span>
      </div>

      <Table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Snippet</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-4">
          {inboundLinks.map((row, index) => (
            <TableRow key={index} className="border-none">
              <TableCell className="py-4">{row.position}</TableCell>
              <TableCell className="py-4">{row.title}</TableCell>
              <TableCell className="py-4">{row.snippet}</TableCell>
              <TableCell className="flex items-center space-x-2 py-4">
                <Link
                  href={row.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center space-x-1"
                >
                  <span>{row.displayedLink}</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default InboundLinks;
