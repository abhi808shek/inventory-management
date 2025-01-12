import { FC } from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="overflow-x-auto rounded">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={colIndex}
                className="px-4 py-2 border-b border-gray-300 text-left"
              >
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border-b border-gray-300"
                >
                  <div className="h-6 w-full bg-gray-200 animate-pulse rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
