import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./style.css";

const DynamicFormTable = ({ colsData }: any) => {
  return (
    <div className="w-full overflow-x-auto h-[calc(100svh - var(--navbar-height)">
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-[var(--table-data-heading-bg-color)] text-[var(--table-data-dark-variant-text-color)] text-sm font-medium">
              Permissions
            </TableHead>
            {colsData.map((col: any, index: number) => (
              <TableHead
                className={`bg-[var(--table-data-heading-bg-color)] sticky top-0 font-medium text-[var(--table-data-dark-variant-text-color)] text-sm`}
                key={index}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          // style={{
          //   maxHeight: `calc(100vh - var(--navbar-height) - 280px) !important`,
          //   overflowY: "auto",
          // }}
          className="max-h-[calc(100svh-var(--navbar-height)-280px)) overflow-y-auto custom-scrollbar"
        ></TableBody>
      </Table>
    </div>
  );
};

export default DynamicFormTable;
