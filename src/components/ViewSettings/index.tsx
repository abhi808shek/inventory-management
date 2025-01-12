import { Fragment } from "react";
import { Filter, X } from "lucide-react";
import SwitchUi from "@/components/switch-ui";
import { Separator } from "@/components/ui/separator";
import SelectUi from "@/components/select-ui";
const ViewSettings = ({ dynamictableHeader, setViewSettingMode }: any) => {
  const options = [
    { id: "dark", value: "Dark" },
    { id: "light", value: "Light" },
  ];

  return (
    <div className="viewSettings hidden h-[calc(100svh - var(--navbar-height) sm:w-[30%] px-5 gap-2 sm:flex items-center justify-center flex-col bg-white rounded-t-lg">
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
      <div
        className="w-[90%] px-5 bg-white rounded-lg border-[1px] py-3 overflow-auto"
        // style={{ height: "calc(100dvh - var(--navbar-height) - 100px)" }}
      >
        <div className="flex items-center justify-between h-5 py-4">
          <span className="font-medium text-sm">Filters</span>
          <span>
            <Filter className="text-[#999999] w-4 h-4" />
          </span>
        </div>
        {dynamictableHeader?.table_top?.buttons?.menu?.filters?.map(
          ({ type }: any, index: number) => {
            console.log("type", type);

            return (
              <Fragment key={index}>
                {type === "SELECT" && (
                  <div className="py-4 w-full">
                    <SelectUi placeholder="Theme" options={options} />
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
            <span>
              <Filter className="text-[#999999] w-4 h-4" />
            </span>
          </div>

          {[1, 2, 3, 4, 2, 2, 2]?.map((_: any, index: number) => (
            <div className="w-full flex justify-between py-3" key={index}>
              <span className="text-xs font-normal">Issue type</span>
              <span>
                <SwitchUi />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSettings;
