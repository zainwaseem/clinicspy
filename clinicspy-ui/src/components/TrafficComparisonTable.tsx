import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type PremiumContentItem = {
  Competitor: string;
  "Com. Level": string | number;
  "Com. Keywords": string | number;
  "SE Keywords": string | number;
};
type DataItem = {
  Competitor: string;
  "Com. Level": string | number;
  "Com. Keywords": string | number;
  "SE Keywords": string | number;
};

// disable eslint warning
// eslint-disable-next-line react/no-array-index-key
const TrafficComparisonTable = ({
  premiumContent,
}: {
  // disable eslint warning
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  premiumContent: PremiumContentItem[] | any;
}) => {
  // Transform the data to match the table format
  // disable eslint warning
  // eslint-disable-next-line react/no-array-index-key
  const data =
    (Array.isArray(premiumContent) &&
      premiumContent[4]?.Data?.map((item: DataItem) => ({
        competitor: item.Competitor,
        comLevel: Number(item["Com. Level"]),
        comKeywords: Number(item["Com. Keywords"]),
        seKeywords: Number(item["SE Keywords"]),
      }))) ||
    [];

  return (
    <div className="container mx-auto p-8">
      <Table className="border">
        <TableCaption>Competitor Traffic Comparison</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Competitor</TableHead>
            <TableHead>Competition Level</TableHead>
            <TableHead>Common Keywords</TableHead>
            <TableHead>Search Engine Keywords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          {data &&data?.map((item: any, index: number) => (
              // disable eslint warning
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={index}>
                <TableCell className="font-medium">{item.competitor}</TableCell>
                <TableCell>{item?.comLevel}</TableCell>
                <TableCell>{item?.comKeywords || 0}</TableCell>
                <TableCell>{item?.seKeywords || 0}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrafficComparisonTable;
