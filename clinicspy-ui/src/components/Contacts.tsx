import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Pagination from "@/components/Pagination"; // Assuming you have a path for Pagination component

type ContactItem = {
  type: string; // Added type to distinguish between "Email" and "External Email"
  value: string;
  sources: { ref: string; extracted_on: string; updated_on: string }[];
};

// disable eslint
/* eslint-disable */
const Contacts = ({
  emails,
  external_emails,
  phones,
}: {
  emails: any[];
  external_emails: any[];
  phones: any[];
}) => {
  // Combine emails and external_emails into one list and indicate the type
  const combinedEmails: ContactItem[] = [
    ...(emails?.map((item) => ({ type: "Email", ...item })) || []),
    ...(external_emails?.map((item) => ({ type: "External Email", ...item })) ||
      []),
  ];

  // Phones array stays as it is or empty if undefined
  const combinedPhones: ContactItem[] =
    phones?.map((item) => ({ ...item })) || [];

  // Pagination state for emails
  const [emailPage, setEmailPage] = useState(1);
  const [emailPerPage, setEmailPerPage] = useState(5);

  const totalEmailPages = Math.ceil(combinedEmails.length / emailPerPage);
  const emailStartIndex = (emailPage - 1) * emailPerPage;
  const emailEndIndex = emailStartIndex + emailPerPage;
  const paginatedEmails = combinedEmails?.slice(emailStartIndex, emailEndIndex);

  // Pagination state for phones
  const [phonePage, setPhonePage] = useState(1);
  const [phonePerPage, setPhonePerPage] = useState(5);

  const totalPhonePages = Math.ceil(combinedPhones?.length / phonePerPage);
  const phoneStartIndex = (phonePage - 1) * phonePerPage;
  const phoneEndIndex = phoneStartIndex + phonePerPage;
  const paginatedPhones = combinedPhones?.slice(phoneStartIndex, phoneEndIndex);

  return (
    <section className="container mx-auto px-4 py-8 space-y-8">
      {/* Table for Emails and External Emails */}
      {combinedEmails.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Emails & External Emails
          </h2>
          <Table className="w-full bg-white shadow-sm overflow-hidden">
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead>Type</TableHead> {/* Added Type Column */}
                <TableHead>Value</TableHead>
                <TableHead>Sources</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4">{item.type}</TableCell>{" "}
                  {/* Display Email or External Email */}
                  <TableCell className="py-4">{item.value}</TableCell>
                  <TableCell className="py-4">
                    <ul>
                      {item.sources.map((source, idx) => (
                        <li key={idx} className="mb-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={source.ref}
                                  target="_blank"
                                  className="text-primary hover:underline"
                                >
                                  Source {idx + 1}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent className="bg-primary text-white p-2 rounded shadow-lg">
                                <p>Extracted: {source.extracted_on}</p>
                                <p>Updated: {source.updated_on}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Email Pagination */}
          <Pagination
            currentPage={emailPage}
            totalPages={totalEmailPages}
            totalItems={combinedEmails.length}
            perPage={emailPerPage}
            onNext={() =>
              setEmailPage((prev) => Math.min(prev + 1, totalEmailPages))
            }
            onPrevious={() => setEmailPage((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      ) : (
        <p className="text-red-500">No email data available.</p>
      )}

      {/* Table for Phones */}
      {combinedPhones.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Phone Numbers</h2>
          <Table className="w-full bg-white shadow-sm overflow-hidden">
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Sources</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPhones.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4">Phone</TableCell>
                  <TableCell className="py-4">{item.value}</TableCell>
                  <TableCell className="py-4">
                    <ul>
                      {item.sources.map((source, idx) => (
                        <li key={idx} className="mb-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={source.ref}
                                  target="_blank"
                                  className="text-primary hover:underline"
                                >
                                  Source {idx + 1}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent className="bg-primary text-white p-2 rounded shadow-lg">
                                <p>Extracted: {source.extracted_on}</p>
                                <p>Updated: {source.updated_on}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Phone Pagination */}
          <Pagination
            currentPage={phonePage}
            totalPages={totalPhonePages}
            totalItems={combinedPhones.length}
            perPage={phonePerPage}
            onNext={() =>
              setPhonePage((prev) => Math.min(prev + 1, totalPhonePages))
            }
            onPrevious={() => setPhonePage((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      ) : (
        <p className="text-red-500">No phone data available.</p>
      )}
    </section>
  );
};

export default Contacts;
