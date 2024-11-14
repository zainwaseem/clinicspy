"use client";
import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // importing your UI table components

// disable eslint warnings
/* eslint-disable */
const KeywordsTable: FC<{ premiumContent: any }> = ({ premiumContent }) => {
  const organicKeywordsData = premiumContent[2]?.Data || []; // Mapping the first data object for "Top Organic Keywords"

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(organicKeywordsData.length).fill(false)
  );
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckAll = () => {
    const newCheckedStatus = !isAllChecked;
    setCheckedItems(Array(organicKeywordsData.length).fill(newCheckedStatus));
    setIsAllChecked(newCheckedStatus);
  };

  const handleCheckItem = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    // Update "check all" status based on individual selections
    const allChecked = updatedCheckedItems.every((item) => item);
    setIsAllChecked(allChecked);
  };

  return (
    <div className="container mx-auto p-8">
      <Table className="border">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </TableHead>
            <TableHead>Keyword</TableHead>
            <TableHead>Intent</TableHead>
            <TableHead className="text-center">Pos.</TableHead>
            <TableHead className="text-center">Volume</TableHead>
            <TableHead className="text-center">CPC (USD)</TableHead>
            <TableHead className="text-center">Traffic %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organicKeywordsData.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckItem(index)}
                />
              </TableCell>
              <TableCell className="text-blue-500 hover:underline">
                {row.Keyword || ""}
              </TableCell>
              <TableCell className="text-center">{row.Intent || ""}</TableCell>
              <TableCell className="text-center">{row["Pos."] || ""}</TableCell>
              <TableCell className="text-center">{row.Volume || ""}</TableCell>
              <TableCell className="text-center">
                {row["CPC(USD)"] || ""}
              </TableCell>
              <TableCell className="text-center">
                {row["Traffic %"] || ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KeywordsTable;
