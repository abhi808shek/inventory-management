import { FC } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

type PROP_TYPE = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onClick: (page: number) => void;
};

const Pagination: FC<PROP_TYPE> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onClick,
}) => {
  const renderPageNumbers = () => {
    const maxVisiblePages = 5; // Maximum number of pages to display
    const pages: any = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are within the limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 border-t">
      <span className="text-[#666666] text-[10px] font-normal">
        Showing {rowsPerPage * (currentPage - 1) + 1} to{" "}
        {Math.min(rowsPerPage * currentPage, totalPages * rowsPerPage)} of{" "}
        {totalPages * rowsPerPage} entries
      </span>
      <div className="flex gap-2 items-center justify-center">
        <button
          className="bg-[#F0F6FF] p-2 rounded-full"
          disabled={currentPage === 1}
          onClick={() => onClick(currentPage - 1)}
        >
          <MoveLeft
            color="#5D54C9"
            width="16"
            height="16"
            className="font-light"
          />
        </button>
        {renderPageNumbers().map((page: string, index: number) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`flex items-center justify-center rounded-full w-7 h-7 text-[11px] font-semibold ${
                currentPage === page
                  ? "bg-[#5159B8] text-white"
                  : "text-[#626C70] hover:bg-gray-100"
              }`}
              onClick={() => onClick(page)}
            >
              {String(page).padStart(2, "0")}
            </button>
          ) : (
            <span
              key={index}
              className="text-[#626C70] flex items-center justify-center text-[11px] font-semibold"
            >
              {page}
            </span>
          )
        )}
        <button
          className="bg-[#F0F6FF] p-2 rounded-full"
          disabled={currentPage === totalPages}
          onClick={() => onClick(currentPage + 1)}
        >
          <MoveRight
            color="#5D54C9"
            width="16"
            height="16"
            className="font-light"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
