import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: "🏠",
      url: "#",
    },
    {
      title: "Reports",
      icon: "📊", // Assuming an icon for Reports
      url: "#",
      items: [
        {
          title: "One",
          url: "#",
        },
        {
          title: "Two",
          url: "#",
        },
        {
          title: "Three",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Transactions",
      icon: "💰", // Assuming an icon for Transactions
      url: "#",
      items: [],
    },
    {
      title: "Report",
      icon: "📄", // Assuming an icon for Report
      url: "#",
      items: [],
    },
    {
      title: "Settings",
      icon: "⚙️",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpen, toggleMouseEvent, isHoverOpen } = useSidebar();

  return (
    <Sidebar
      {...props}
      onMouseLeave={() => {
        if (isHoverOpen) {
          setOpen(false);
          toggleMouseEvent(false);
        }
      }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className=" p-5 ">
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                // defaultOpen={true }
                className="group/collapsible"
              >
                <SidebarMenuItem key={item.title} className=" py-2">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="font-medium">
                        <span className="pr-2">{item.icon}</span>
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <a href={"#"} className="font-medium">
            <span className="pr-2">{""}</span>
            <span>Help</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail
        onMouseEnter={() => {
          if (!isHoverOpen) {
            toggleMouseEvent(true);
            setOpen(true);
          }
        }}
      />
    </Sidebar>
  );
}
