import { Fragment } from "react";
import { Filter, X } from "lucide-react";
import SwitchUi from "@/components/switch-ui";
import { Separator } from "@/components/ui/separator";
import SelectUi from "@/components/select-ui";
import { modifiedFieldList } from "@/utils/globalUtils";
const ViewSettings = ({
  all_cols,
  dynamictableHeader,
  setViewSettingMode,
  tableDataHandle,
  tableHeaderHandler,
}: any) => {
  return (
    <div className="viewSettings hidden h-[calc(100svh - var(--navbar-height) sm:w-[30%] px-5 gap-2 sm:flex items-center flex-col bg-white rounded-t-lg">
      <div className="h-[52px] flex justify-between  items-center w-full border-b-[1px] border-[#E5E7E8] ">
        <span> {dynamictableHeader?.table_top?.buttons?.menu?.title}</span>
        <span
          className="cursor-pointer"
          onClick={() => setViewSettingMode(false)}
        >
          <X />
        </span>
      </div>

      {/* View Settings Filter Box */}
      <div className="w-[90%] px-5 bg-white rounded-lg border-[1px] py-3 overflow-auto">
        <div className="flex items-center justify-between h-5 py-4">
          <span className="font-medium text-sm">Filters</span>
          <span>
            <Filter className="text-[#999999] w-4 h-4" />
          </span>
        </div>
        {dynamictableHeader?.table_top?.buttons?.menu?.filters?.map(
          ({ type, data }: any, index: number) => {
            return (
              <Fragment key={index}>
                {type === "SELECT" && (
                  <div className="py-4 w-full">
                    <SelectUi placeholder="Theme" options={data} />
                  </div>
                )}
                {type === "TOGGLE" && (
                  <div className="w-full flex justify-between py-4">
                    <span className="text-xs font-normal">Issue type</span>
                    <span>
                      <SwitchUi />
                    </span>
                  </div>
                )}
              </Fragment>
            );
          }
        )}
        <Separator />
        <div className="py-4">
          <div className="flex items-center justify-between h-5 ">
            <span className="font-medium text-sm">Fields</span>
            <span className="cursor-pointer">
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

          {modifiedFieldList(all_cols)?.map((item: any, index: number) => (
            <div className="w-full flex justify-between py-3" key={index}>
              <span className="text-xs font-normal">{item.name}</span>
              <span>
                <SwitchUi
                  item={item}
                  tableDataHandle={tableDataHandle}
                  tableHeaderHandler={tableHeaderHandler}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSettings;
