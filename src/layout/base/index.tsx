import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, File, House, ListChecks } from "lucide-react";
import SearchCommand from "@/components/ui/search-command";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
const BaseLayout = () => {
  const [open, setOpen] = useState(false);

  const actionButtonOptions = [
    { Icon: DollarSign, label: "Edit" },
    { Icon: File, label: "Delete" },
    { Icon: House, label: "View" },
    { Icon: ListChecks, label: "Settings" },
  ];

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
          <SidebarInset className="rounded shadow-lg">
            <header className="flex h-[70px] shrink-0 justify-center flex-col px-[24px] pt-[10px] bg-[#F8F7F8]">
              <div className="flex items-center gap-2">
                {/* <SidebarTrigger /> */}
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="block">
                      <BreadcrumbLink>Page title</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="block text-[#6A7682]" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Page title</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex justify-between">
                <span className="text-[28px] font-bold text-[var(--deafult-Btn-color)]">
                  Users
                </span>
                <div className="gap-[12px] flex justify-between items-center">
                  <Popover>
                    <PopoverTrigger asChild>
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
                    </PopoverTrigger>
                    <PopoverContent
                      align="end" // Aligns the content to the center of the trigger
                      sideOffset={5}
                      className="w-40 flex flex-col gap-2"
                    >
                      {actionButtonOptions?.map((item) => (
                        <div className="flex gap-1 cursor-pointer hover:bg-[var(--deafult-Btn-color)] hover:text-white py-2 rounded-lg text-sm pl-2">
                          {item?.Icon && <item.Icon size={18} />}
                          {item?.label}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="filterButton"
                    className="h-[31.83px!important]"
                  >
                    + Add
                  </Button>
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
