import Link from "next/link";
import React from "react";
// disable eslint warning
/* eslint-disable */
const TopPages = ({ socials }: { socials: any }) => {
  return (
    <div className="w-full mt-8 p-6 bg-white rounded-lg shadow-sm container mx-auto">
      <div className="flex justify-start items-center flex-col lg:flex-row text-lg font-semibold text-black">
        <span className="mr-2">Top Pages –</span>
        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline max-w-80  truncate"
        >
          {socials &&
            socials?.socials &&
            (socials?.socials?.facebook ||
              socials?.socials?.instagram ||
              socials?.socials?.twitter ||
              socials?.socials?.linkedin ||
              socials?.socials?.youtube)}
        </Link>
      </div>

      <div className=" overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-gray-500 font-medium border-b">
              <th className="py-2">Pages</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {socials &&
              socials?.socials &&
              Object.entries(socials?.socials).map(([key, value]) => (
                <tr key={key}>
                  <td className="py-3 text-primary ">
                    <Link
                      href={value as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold capitalize"
                    >
                      {key}
                    </Link>

                    <div className="text-gray-500">
                      <Link
                        // href="#"
                        href={value as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:max-w-64 max-w-40 truncate hover:underline"
                      >
                        {value as string}{" "}
                        <span className="inline-block ml-1 text-primary">
                          ↗
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPages;
