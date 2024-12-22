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
import { sidebarOptions } from "@/assets/data/sidebarOptions";
import { Link, useLocation } from "react-router-dom";
import { memo, useState } from "react";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [selectedoption, setSelectedOption] = useState<null | string>(null);

  const { setOpen, toggleMouseEvent, isHoverOpen } = useSidebar();

  const location = useLocation();

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
            {sidebarOptions.map((item) => (
              <Collapsible
                key={item.label}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem key={item.label} className=" py-2">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="font-medium">
                        <img src={item.icon ?? undefined} alt="ICON" />
                        <span>{item.label}</span>
                        {item.children?.length ? (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        ) : null}
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.children?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                `${item.path}${child.path}` ===
                                location.pathname
                              }
                            >
                              <Link to={child.path}>{child.label}</Link>
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
};

export default memo(AppSidebar);
