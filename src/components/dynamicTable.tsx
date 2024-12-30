import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { AllColsType, DataItem, DataType } from "@/types/tableDataType";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import Pagination from "@/components/Pagination";
import { Pencil, Trash2, Eye } from "lucide-react";
import "./style.css";

// Static column definitions (all_cols)
type PROP_TYPE = {
  colsData: AllColsType;
  data: DataType;
  rowsPerPage?: number; // Optional prop for rows per page
};

const DynamicTable: FC<PROP_TYPE> = ({ colsData, data, rowsPerPage = 4 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resolveNestedKey = (obj: any, key: string): any => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const actionButtonOptions = [
    { Icon: Pencil, label: "Edit", iconColor: "#007BFF" },
    { Icon: Trash2, label: "Delete", iconColor: "#FF4D4D" },
    { Icon: Eye, label: "View", iconColor: "#28A745" },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E6FAF4] text-[#18795F]";
      case "Inactive":
        return "bg-[#FDF1ED] text-[#923416]";
      case "Pending":
        return "bg-[#FFF7E5] text-[#F9AD32]";
      case "Disabled":
        return "bg-[#F3F3F3] text-[#505862]";
      default:
        return "bg-blue-100 text-blue-700"; // Default style
    }
  };

  const StatusCell = ({ status }: { status: string }) => {
    return (
      <div
        className={`m-auto flex w-24 items-center px-2 py-1 rounded ${getStatusStyles(
          status
        )}`}
      >
        <span className="flex-1 text-[14px] font-medium">{status}</span>
        <ChevronDown className="ml-1 w-[16px] h[16px]" />
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto h-[calc(100svh - var(--navbar-height)">
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-[var(--table-data-heading-bg-color)] sticky top-0 w-[50px] text-center font-medium">
              S.NO
            </TableHead>
            {colsData.map((col, index: number) => (
              <TableHead
                className={`bg-[var(--table-data-heading-bg-color)] sticky top-0 ${
                  col.config.type === "status" ? "text-center" : "text-start"
                } font-medium`}
                key={index}
              >
                {col.headerName}
              </TableHead>
            ))}
            <TableHead className="bg-[var(--table-data-heading-bg-color)] sticky top-0 w-[50px] text-center font-medium">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          // style={{
          //   maxHeight: `calc(100vh - var(--navbar-height) - 280px) !important`,
          //   overflowY: "auto",
          // }}
          className="max-h-[calc(100svh-var(--navbar-height)-280px)) overflow-y-auto custom-scrollbar"
        >
          {data.map((item, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-[var(--light-text)] text-center">
                {rowsPerPage * (currentPage - 1) + index + 1}
              </TableCell>
              {colsData.map((col, colIndex: number) => {
                const config = col.config;

                // Multi-row data handling (e.g., User column)
                if (config.type === "multi_row") {
                  return (
                    <TableCell key={colIndex}>
                      {config?.values?.map((value, valueIndex) => {
                        const key: string = value.value.key;
                        const data = item[key as keyof DataItem];

                        if (value.value.type === "link" && value?.value?.link) {
                          const link = value.value.link.replace(
                            "[1]",
                            item.id.toString()
                          );
                          return (
                            <div key={valueIndex}>
                              <Link
                                to={link}
                                className="font-normal text-[var(--table-data-link-variant-text-color)] hover:underline"
                              >
                                {data?.toString()}
                              </Link>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={valueIndex}
                              className="font-normal text-[var(--table-data-light-variant-text-color)]"
                            >
                              {data?.toString()}
                            </div>
                          );
                        }
                      })}
                    </TableCell>
                  );
                }

                if (
                  config.type === "data" &&
                  config.key &&
                  !Array.isArray(config.key)
                ) {
                  const cellValue = resolveNestedKey(item, config.key);

                  // If the column has a link configuration
                  if (config.link) {
                    const link = config.link.replace(
                      "[1]",
                      resolveNestedKey(
                        item,
                        config.linkParams?.[0] as string
                      ) || ""
                    );
                    return (
                      <TableCell key={colIndex} className="text-start">
                        <Link
                          to={link}
                          className="text-[var(--table-data-link-variant-text-color)] underline"
                        >
                          {cellValue || "-"}
                        </Link>
                      </TableCell>
                    );
                  }

                  // Render plain data
                  return (
                    <TableCell
                      className="text-start text-[var(--table-data-light-variant-text-color)]"
                      key={colIndex}
                    >
                      {cellValue || "-"}
                    </TableCell>
                  );
                }

                // Link data rendering (e.g., Role, Project)
                if (
                  (config.type === "link" || config.type === "dataArray") &&
                  config.link
                ) {
                  const link = config.link?.replace(
                    "[1]",
                    (item[config.linkParams?.[0] as keyof DataItem] ||
                      item.id) as string
                  );
                  const data = config.key.includes(".")
                    ? resolveNestedKey(item, config.key as string)
                    : item[config.key as keyof DataItem];
                  return (
                    <TableCell key={colIndex} className="text-start">
                      <Link
                        to={link}
                        className="font-medium text-[var(--table-data-link-variant-text-color)] hover:underline"
                      >
                        {data.name || data}
                      </Link>
                    </TableCell>
                  );
                }

                // Status handling
                if (config.type === "status") {
                  return (
                    <TableCell
                      key={colIndex}
                      className="w-auto text-center m-auto"
                    >
                      <StatusCell
                        status={
                          (item[config.key as keyof DataItem] ||
                            "Unknown") as string
                        }
                      />
                    </TableCell>
                  );
                }

                return <TableCell key={colIndex}>-</TableCell>;
              })}
              <TableCell className="text-center">
                <Popover>
                  <PopoverTrigger>
                    <div className="bg-[#F5F6F7] m-auto w-[26px] h-[26px] rounded-full flex items-center justify-center cursor-pointer">
                      <EllipsisVertical width={16} height={16} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[150px] bg-white shadow-lg"
                    align="end"
                    sideOffset={0}
                  >
                    <ul>
                      {actionButtonOptions?.map((item) => (
                        <li className="flex gap-3 cursor-pointer hover:bg-[var(--deafult-Btn-color)] hover:text-white p-2 pl-1 rounded text-sm">
                          {item?.Icon && (
                            <item.Icon
                              size={18}
                              style={{ color: item.iconColor }}
                            />
                          )}
                          {item?.label}
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={30}
        onClick={(page: number) => setCurrentPage(page)}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default DynamicTable;
