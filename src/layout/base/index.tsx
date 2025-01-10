import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SearchCommand from "@/components/ui/search-command";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import handleAsync from "@/utils/handleAsync";
import { DynamicTableArchitectureApi } from "@/api/table.api";
import useApi from "@/hooks/useApi";
import { dynamicTableArchitectureList } from "@/store/dynamicTable/dynamic-table-reducer";

const BaseLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { dynamicTableArchitecture } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  const dispatch = useDispatch();
  const titleObj: any = {
    "/roles": "ROLE-LIST",
    "/permissions": "ROLE-ADD",
    "/users": "USER-LIST",
    "/users/add": "USER-ADD",
    "/purchase-orders": "PO-LIST",
    "/invoicing": "INVOICE-LIST",
    "/challan": "CHALLAN-LIST",
  };

  // Dynamic Table Architechture API Fetcher Function
  const dynamicTableArchitectureFunction = handleAsync(async () => {
    const res = await DynamicTableArchitectureApi(titleObj[location.pathname]);
    dispatch(dynamicTableArchitectureList(res?.data?.data ?? null));
    return res;
  });
  const { execute: dynamicDataArchitectureFetcher } = useApi(
    dynamicTableArchitectureFunction
  );
  useEffect(() => {
    dynamicDataArchitectureFetcher();
  }, [location.pathname]);

  return (
    <div className="w-full h-[100svh] overflow-hidden">
      {/* Navbar Code */}
      <SidebarProvider>
        <Navbar setOpen={setOpen} />
        {/* Header Section */}
        <div
          className="flex"
          style={{ height: "calc(100svh - var(--navbar-height))" }}
        >
          <AppSidebar />
          <SidebarInset className="rounded shadow-lg w-full">
            <header className="flex h-[70px] shrink-0 justify-center flex-col px-[24px] pt-[10px] bg-[#F8F7F8]">
              <div className="flex items-center gap-2">
                {/* <SidebarTrigger /> */}
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <BreadcrumbList>
                  {dynamicTableArchitecture?.page_header?.breadcrumb?.map(
                    (item: any, index: number) => (
                      <BreadcrumbItem key={item.link}>
                        <BreadcrumbLink
                          href={item.link}
                          className={`capitalize ${item.variant}`}
                        >
                          {item.label}
                        </BreadcrumbLink>
                        {index <
                          dynamicTableArchitecture?.page_header?.breadcrumb
                            ?.length -
                            1 && (
                          <BreadcrumbSeparator className="">
                            <ChevronRight
                              style={{ color: "#000", fontSize: "6px" }}
                            />
                          </BreadcrumbSeparator>
                        )}
                      </BreadcrumbItem>
                    )
                  )}
                </BreadcrumbList>
              </div>
              <div className="flex justify-between">
                <span className="text-[28px] font-bold text-[var(--deafult-Btn-color)]">
                  {dynamicTableArchitecture?.page_header?.title}
                </span>
                <div className="gap-[12px] flex justify-between items-center">
                  {dynamicTableArchitecture?.page_header?.buttons?.map(
                    (item: any, index: number) => (
                      <Fragment key={index}>
                        <Popover>
                          <PopoverTrigger asChild>
                            {item?.type === "ACTION BUTTON" && (
                              <span className="h-[28px] w-[43.27px] flex items-center justify-center bg-[#F0F6FF] rounded-[7.64px] cursor-pointer">
                                <svg
                                  width="11"
                                  height="4"
                                  viewBox="0 0 11 4"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.13435 1.91581C3.13435 2.61872 2.56452 3.18855 1.86161 3.18855C1.15869 3.18855 0.588867 2.61872 0.588867 1.91581C0.588867 1.21289 1.15869 0.643066 1.86161 0.643066C2.56452 0.643066 3.13435 1.21289 3.13435 1.91581Z"
                                    fill="#5159B8"
                                  />
                                  <path
                                    d="M6.95257 1.91581C6.95257 2.61872 6.38274 3.18855 5.67983 3.18855C4.97691 3.18855 4.40709 2.61872 4.40709 1.91581C4.40709 1.21289 4.97691 0.643066 5.67983 0.643066C6.38274 0.643066 6.95257 1.21289 6.95257 1.91581Z"
                                    fill="#5159B8"
                                  />
                                  <path
                                    d="M9.49805 3.18855C10.201 3.18855 10.7708 2.61872 10.7708 1.91581C10.7708 1.21289 10.201 0.643066 9.49805 0.643066C8.79514 0.643066 8.22531 1.21289 8.22531 1.91581C8.22531 2.61872 8.79514 3.18855 9.49805 3.18855Z"
                                    fill="#5159B8"
                                  />
                                </svg>
                              </span>
                            )}
                          </PopoverTrigger>
                          <PopoverContent
                            align="end" // Aligns the content to the center of the trigger
                            sideOffset={5}
                            className="w-40 flex flex-col gap-2"
                          >
                            {item?.menu?.map((item: any, index: number) => (
                              <div
                                className="flex gap-2 cursor-pointer hover:bg-[var(--hover-bg-option)] py-2 rounded-lg text-sm pl-2"
                                key={index}
                              >
                                {/* {item?.Icon && <item.Icon size={18} />} */}
                                {item?.label}
                              </div>
                            ))}
                          </PopoverContent>
                        </Popover>
                        {item?.type === "ADD BUTTON" && (
                          <Button
                            variant="filterButton"
                            className="h-[31.83px!important]"
                          >
                            {item?.label}
                          </Button>
                        )}
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 bg-[var(--main-section-bg-color)]">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      {open && <SearchCommand open={open} setOpen={setOpen} />}
    </div>
  );
};

export default BaseLayout;
