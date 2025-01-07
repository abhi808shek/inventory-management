import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Permission {
  id: number;
  codename: string;
}

interface PERMS {
  view?: Permission;
  create?: Permission;
  modify?: Permission;
  delete?: Permission;
}

interface PermissionRow {
  label: string;
  perms: PERMS;
}

interface PermissionGroup {
  label: string;
  perms?: PERMS;
  children: PermissionRow[];
}

interface PermissionsResponse {
  permission_types: string[];
  results: PermissionGroup[];
}

const permissionsData: PermissionsResponse = {
  permission_types: ["View", "Create", "Modify", "Delete"],
  results: [
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
  ],
};

const PermissionsTable: React.FC = () => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderPermissionCells = (perms?: PermissionRow["perms"]) => {
    return permissionsData.permission_types.map((type) => (
      <td key={type} className="px-4 py-2 text-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            disabled={!perms?.[type.toLowerCase() as keyof typeof perms]}
            defaultChecked={!!perms?.[type.toLowerCase() as keyof typeof perms]}
            className="hidden peer"
          />
          <div className="w-5 h-5 flex items-center border-[1px] border-[#D7D7DD] rounded bg-white peer-checked:bg-[#5159B8] peer-checked:border-[#5159B8] relative">
            <Check
              className="absolute inset-0 m-auto text-white peer-checked:block peer-checked:text-white"
              size={16}
            />
          </div>
        </label>
      </td>
    ));
  };

  return (
    <div className="overflow-auto py-4 h-auto">
      <table className="w-full text-sm table-auto">
        <thead className="bg-[#F6F7F8]">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-[14px] min-w-[180px]">
              Permission
            </th>
            {permissionsData.permission_types.map((type) => (
              <th
                key={type}
                className="px-4 py-2 text-center font-medium min-w-[180px] flex-1"
              >
                {type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissionsData.results.map((group, groupIndex) => (
            <React.Fragment key={group.label}>
              {/* Parent Row */}
              <tr
                className={`bg-[#ffffff] cursor-pointer ${
                  groupIndex < permissionsData.results.length - 1
                    ? "border-b border-[#F3F3F3]"
                    : ""
                }`}
              >
                <td
                  className="pl-3 pr-4 py-2 font-medium text-[14px] text-[#333333]"
                  onClick={() => toggleGroup(group.label)}
                >
                  <span className="flex items-center">
                    <ChevronDown
                      height={14}
                      width={14}
                      className={`mr-2 transform transition-transform duration-300 ${
                        expandedGroups[group.label] ? "rotate-180" : ""
                      }`}
                    />
                    {group.label}
                  </span>
                </td>
                {/* {renderPermissionCells(group.perms)} */}
              </tr>

              {/* Child Rows */}
              {expandedGroups[group.label] &&
                group.children.map((child, childIndex) => (
                  <tr
                    key={child.label}
                    className={`bg-[#f5f6f7] text-[#999999] ${
                      childIndex < group.children.length - 1
                        ? "border-b border-[#F3F3F3] text-[14px]"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2 pl-8">{child.label}</td>
                    {renderPermissionCells(child.perms)}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
