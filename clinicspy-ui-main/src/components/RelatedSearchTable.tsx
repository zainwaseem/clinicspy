import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RelatedSearch {
  title: string;
  link: string;
}

interface RelatedSearchTableProps {
  related_search: RelatedSearch[];
}

const RelatedSearchTable: React.FC<RelatedSearchTableProps> = ({
  related_search,
}) => {
  return (
    <div className="container lg:p-10 p-4">
      <h2 className="font-medium text-lg my-4">
        A list of related searches you might be interested in.
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {related_search.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="text-right">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Visit
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RelatedSearchTable;
