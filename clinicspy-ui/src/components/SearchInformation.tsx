import React from "react";

interface SearchInformation {
  total_results: string;
  time_taken_displayed: string;
}

interface SearchInfoProps {
  search_information: SearchInformation[];
}

const SearchInfo: React.FC<SearchInfoProps> = ({ search_information }) => {
  const { total_results, time_taken_displayed } = search_information[0];

  return (
    <div className="flex lg:p-10 p-4 mx-auto  my-10 rounded-md shadow-sm">
      <div className="text-gray-700 font-medium">
        <span className="text-blue-600">{total_results}</span> results found
      </div>
      &nbsp;
      <div className="text-gray-500">in {time_taken_displayed} seconds</div>
    </div>
  );
};

export default SearchInfo;
