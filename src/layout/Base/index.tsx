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
import SearchCommand from "@/components/ui/search-command";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
const BaseLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-[100dvh] overflow-hidden">
      {/* Navbar Code */}
      <Navbar setOpen={setOpen} />

      {/* Header Section */}
      <div style={{ height: "calc(100vh - var(--navbar-height))" }}>
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
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
      {open && <SearchCommand open={open} setOpen={setOpen} />}
    </div>
  );
};

export default BaseLayout;
