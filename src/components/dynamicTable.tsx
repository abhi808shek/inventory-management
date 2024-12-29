import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { AllColsType, DataType } from "@/types/tableDataType";
import { ChevronDown } from "lucide-react";

// Static column definitions (all_cols)
type PROP_TYPE = {
  cols: AllColsType;
  data: DataType;
};

const DynamicTable: FC<PROP_TYPE> = ({ cols, data }) => {
  const resolveNestedKey = (obj: any, key: string): any => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

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
        className={`flex w-max items-center px-2 py-1 rounded ${getStatusStyles(
          status
        )}`}
      >
        <span className="flex-1 text-[14px] font-medium">{status}</span>
        <ChevronDown className="ml-1 w-[16px] h[16px]" />
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[var(--table-data-heading-bg-color)]">
          <TableHead className="w-[50px] text-center text[var(--table-data-heading-text-color)] font-medium">
            S.NO
          </TableHead>
          {cols.map((col, index) => (
            <TableHead
              className="text[var(--table-data-heading-text-color)] font-medium"
              key={index}
            >
              {col.headerName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center text-[var(--table-data-light-variant-text-color)]">
              {index + 1}
            </TableCell>
            {cols.map((col, colIndex) => {
              const config = col.config;

              // Multi-row data handling (e.g., User column)
              if (config.type === "multi_row") {
                return (
                  <TableCell key={colIndex}>
                    {config?.values?.map((value, valueIndex) => {
                      const key = value.value.key;
                      const data = item[key];

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
                              {data}
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={valueIndex}
                            className="font-normal text-[var(--table-data-light-variant-text-color)]"
                          >
                            {data}
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
                    resolveNestedKey(item, config.linkParams?.[0]) || ""
                  );
                  return (
                    <TableCell key={colIndex}>
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
                    className="text-[var(--table-data-light-variant-text-color)]"
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
                  item[config.linkParams[0] as keyof typeof item] || item.id
                );
                const data = config.key.includes(".")
                  ? resolveNestedKey(item, config.key)
                  : item[config.key];
                return (
                  <TableCell key={colIndex}>
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
                  <TableCell key={colIndex} className="w-auto">
                    <StatusCell status={item[config.key] || "Unknown"} />
                  </TableCell>
                );
              }

              return <TableCell key={colIndex}>-</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
