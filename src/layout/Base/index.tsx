import { AppSidebar } from "@/components/app-sidebar";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchCommand from "@/components/ui/search-command";
import { useState } from "react";
const BaseLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      {/* Navbar Code */}
      <div className="w-full h-[60px] bg-red-400 flex">
        <div className="w-1/2 ">Logo</div>
        <div className="w-1/2 flex">
          <Search onClick={() => setOpen(true)} />
          <Bell />

          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden min-w-52"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-avatar"
              >
                <li className="dropdown-header gap-3 border-0 pt-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                        alt="avatar 1"
                      />
                    </div>
                  </div>
                  <div>
                    <h6 className="text-base-content/90 text-base font-semibold">
                      John Doe
                    </h6>
                    <small className="text-base-content/50">Admin</small>
                  </div>
                </li>
                <li>
                  <hr className="border-base-content/25 -mx-2 mb-3" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="icon-[tabler--user]"></span>
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="icon-[tabler--settings]"></span>
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="icon-[tabler--receipt-rupee]"></span>
                    Billing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="icon-[tabler--help-triangle]"></span>
                    FAQs
                  </a>
                </li>
                <li>
                  <hr className="border-base-content/25 -mx-2 my-3" />
                </li>
                <li>
                  <a className="dropdown-item btn btn-text btn-error" href="#">
                    <span className="icon-[tabler--logout]"></span>
                    Sign out
                  </a>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-blue-400" style={{ height: "calc(100vh - 60px)" }}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
      {open && <SearchCommand open={open} setOpen={setOpen} />}
    </div>
  );
};

export default BaseLayout;
