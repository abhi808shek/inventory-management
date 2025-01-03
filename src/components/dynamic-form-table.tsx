import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import "./style.css";

const DynamicFormTable = () => {
  const colsData = ["View", "Create", "Modify", "Delete"];
  const rowsData = [
    {
      label: "Items",
      children: [
        {
          label: "Stock",
          perms: {
            view: { id: 1, codename: "itemview" },
            create: { id: 2, codename: "itemcreate" },
            modify: { id: 3, codename: "itemupdate" },
            delete: { id: 4, codename: "itemdelete" },
          },
        },
      ],
    },
    {
      label: "Workflows",
      children: [
        {
          label: "Purchase Orders",
          perms: {
            view: { id: 23, codename: "orderview" },
            create: { id: 25, codename: "ordercreate" },
            modify: { id: 26, codename: "ordermodify" },
            delete: { id: 28, codename: "orderdelete" },
          },
        },
        {
          label: "Invoicing",
          perms: {
            view: { id: 31, codename: "invoiceview" },
            create: { id: 32, codename: "invoicecreate" },
            modify: { id: 35, codename: "invoicemodify" },
          },
        },
        {
          label: "Challan",
          perms: {
            view: { id: 51, codename: "challanview" },
            create: { id: 52, codename: "challancreate" },
            modify: { id: 55, codename: "challanmodify" },
          },
        },
      ],
    },
  ];

  const renderRows = (rows: any) => {
    return rows.map((row: any, index: number) => (
      <React.Fragment key={index}>
        <TableRow className="bg-[var(--table-row-bg)]">
          <TableCell className="font-semibold">{row.label}</TableCell>
          {colsData.map((col) => (
            <TableCell key={col} className="text-center">
              {row.perms?.[col.toLowerCase()] ? (
                <input
                  type="checkbox"
                  defaultChecked={!!row.perms[col.toLowerCase()]}
                  // disabled
                  className="cursor-not-allowed"
                />
              ) : null}
            </TableCell>
          ))}
        </TableRow>
        {row.children && renderRows(row.children)}
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full overflow-x-auto h-[calc(100svh - var(--navbar-height))]">
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-[var(--table-data-heading-bg-color)] text-[var(--table-data-dark-variant-text-color)] text-sm font-medium">
              Permissions
            </TableHead>
            {colsData.map((col, index) => (
              <TableHead
                className={`bg-[var(--table-data-heading-bg-color)] sticky top-0 font-medium text-[var(--table-data-dark-variant-text-color)] text-sm`}
                key={index}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[calc(100svh-var(--navbar-height)-280px)] overflow-y-auto custom-scrollbar">
          {renderRows(rowsData)}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicFormTable;
