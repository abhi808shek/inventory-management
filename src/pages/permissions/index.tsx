import PermissionsTable from "@/components/PermissionsTable";
import { roleNameSetter } from "@/store/roles/roles-reducer";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleIdListSetter } from "@/store/roles/roles-reducer";

const permissionsData: any = {
  permission_types: ["View", "Create", "Modify", "Delete"],
  formBody: [
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

const Permissions = () => {
  const { roleIdList } = useSelector((state: any) => state.roles);
  const { dynamicTableArchitecture } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  const areAllIdsSelected = (): boolean => {
    const allPermissionIds = permissionsData.formBody
      ?.flatMap((group: any) =>
        group.children.flatMap((child: any) =>
          Object.values(child.perms || {}).map((perm: any) => perm?.id)
        )
      )
      .filter(Boolean);

    return allPermissionIds?.every((id: any) => roleIdList.includes(id));
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const allPermissionIds = permissionsData.formBody
      ?.flatMap((group: any) =>
        group.children.flatMap((child: any) =>
          Object.values(child.perms || {}).map((perm: any) => perm?.id)
        )
      )
      .filter(Boolean);

    if (!event.target.checked) {
      dispatch(roleIdListSetter([]));
    } else {
      dispatch(roleIdListSetter(allPermissionIds));
    }
  };

  const dispatch = useDispatch();

  console.log("roleIdList", roleIdList);

  return (
    <div className="bg-white w-full rounded-sm max-h-[calc(100svh-var(--navbar-height)-100px)] flex overflow-hidden shadow">
      {/* Left Table Sections */}
      <div
        className={`leftTable h-max max-h-[92%] w-full overflow-hidden overflow-x-auto pb-3`}
      >
        <div className="bg-white h-full w-full rounded-lg ">
          <div className="h-[56px] flex">
            {/* Search Section */}
            <div className="w-[70%] sm:w-1/2 flex items-center pl-4">
              <input
                className="border-b-[1px] border-[var(--light-text)] bg-transparent p-1 pb-0 focus:outline-none placeholder:font-normal w-[200px]"
                placeholder="New Role"
                onChange={(event) =>
                  dispatch(roleNameSetter(event.target.value))
                }
              />
            </div>
            <div className="w-[30%] sm:w-1/2 flex items-center justify-end pr-4 cursor-pointer ">
              {/* Select All Button */}
              <div className=" flex justify-center items-center gap-4 sm:gap-5">
                <span className="w-[75px] sm:w-[83px] flex items-center gap-1">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden peer"
                      checked={areAllIdsSelected()}
                      onChange={handleSelectAll}
                    />
                    <div className="w-5 h-5 flex items-center border-2 border-gray-300 rounded bg-white peer-checked:bg-[#5159B8] peer-checked:border-[#5159B8] relative">
                      <Check
                        className="absolute inset-0 m-auto text-white peer-checked:block peer-checked:text-white"
                        size={16}
                      />
                    </div>
                  </label>
                  <label
                    htmlFor="selectAll"
                    className="text-xs sm:text-sm font-medium text-[#999999]"
                  >
                    Select All
                  </label>
                </span>
                <span onClick={() => dispatch(roleIdListSetter([]))}>
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.792216 0C1.16041 0 1.45888 0.298477 1.45888 0.666667V2.22866C2.55847 0.86964 4.24001 0 6.12555 0C9.18577 0 11.71 2.29042 12.0792 5.25084C12.1247 5.6162 11.8655 5.94932 11.5001 5.99488C11.1348 6.04044 10.8016 5.78119 10.7561 5.41583C10.4691 3.11449 8.50482 1.33333 6.12555 1.33333C4.54043 1.33333 3.13887 2.12378 2.29517 3.33333H4.12555C4.49374 3.33333 4.79222 3.63181 4.79222 4C4.79222 4.36819 4.49374 4.66667 4.12555 4.66667H0.792216C0.424026 4.66667 0.125549 4.36819 0.125549 4V0.666667C0.125549 0.298477 0.424026 0 0.792216 0ZM0.750985 6.00512C1.11635 5.95956 1.44946 6.21881 1.49502 6.58417C1.78199 8.88551 3.74628 10.6667 6.12555 10.6667C7.71067 10.6667 9.11223 9.87622 9.95593 8.66667H8.12555C7.75736 8.66667 7.45888 8.36819 7.45888 8C7.45888 7.63181 7.75736 7.33333 8.12555 7.33333H11.4589C11.8271 7.33333 12.1255 7.63181 12.1255 8V11.3333C12.1255 11.7015 11.8271 12 11.4589 12C11.0907 12 10.7922 11.7015 10.7922 11.3333V9.77134C9.69263 11.1304 8.01109 12 6.12555 12C3.06533 12 0.541094 9.70958 0.171935 6.74916C0.126376 6.3838 0.385625 6.05068 0.750985 6.00512Z"
                      fill="#999999"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <PermissionsTable
              permissionsData={dynamicTableArchitecture}
              isSelectedAll={areAllIdsSelected()}
            />
          </div>
        </div>
      </div>
      {/* View Setting Pannel or Sections */}
      {/* <div
            className={`viewSettings hidden h-[90%] sm:flex items-center justify-center  bg-blue-300 ${
              viewSettingMode ? "w-[30%]" : "hidden"
            }`}
          >
            <div className="w-[90%] h-[90%] bg-white rounded-lg border-[1px]">
              View Settings
            </div>
          </div> */}
    </div>
  );
};

export default Permissions;
