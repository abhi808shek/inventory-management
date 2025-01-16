import { FC, Fragment, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { roleIdListSetter } from "@/store/roles/roles-reducer";

const PermissionsTable: FC<any> = ({ permissionsData, isSelectedAll }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  const { roleIdList } = useSelector((state: any) => state.roles);

  const dispatch = useDispatch();

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderPermissionCells = (perms?: any) => {
    const onHandleSelect = (type: string) => {
      if (perms?.[type.toLowerCase() as keyof any].id) {
        const id = perms[type.toLowerCase() as keyof any].id;
        let newRoleIdList = JSON.parse(JSON.stringify(roleIdList));

        if (newRoleIdList.includes(id)) {
          newRoleIdList = newRoleIdList.filter((num: number) => num !== id);
        } else {
          newRoleIdList.push(id);
        }
        dispatch(roleIdListSetter(newRoleIdList));
      }
    };

    return permissionsData.permission_types.map((type: any) => (
      <td key={type} className="px-4 py-2 text-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            disabled={!perms?.[type.toLowerCase() as keyof any]}
            checked={
              perms?.[type.toLowerCase() as keyof any] &&
              (isSelectedAll ||
                roleIdList.includes(perms[type.toLowerCase() as keyof any]?.id))
            }
            onChange={() => {
              onHandleSelect(type);
            }}
            className="hidden peer"
          />
          <div
            className={`w-5 h-5 flex items-center border-[1px] border-[#D7D7DD] rounded bg-white peer-checked:bg-[#5159B8] peer-checked:border-[#5159B8] relative`}
          >
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
            {permissionsData.permission_types.map((type: any) => (
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
          {permissionsData.results.map((group: any, groupIndex: number) => (
            <Fragment key={group.label}>
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
                group.children.map((child: any, childIndex: number) => (
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
