import { ComponentProps, memo, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { sidebarOptions } from "@/assets/data/sidebarOptions";
import { Link, useLocation } from "react-router-dom";
import BULB_ICON from "../assets/images/bulb.svg";
import COLLAPSABLE_ICON from "../assets/images/collapsable.svg";
import "./style.css";

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const [activeOption, setActiveOption] = useState("/dashboard");
  const [openDropdown, setOpenDropdown] = useState<null | string>(null);

  const { setOpen, toggleMouseEvent, isHoverOpen, toggleSidebar, open } =
    useSidebar();
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveOption(pathname);
    const mainOption = sidebarOptions.find((option) =>
      pathname.includes(option.path)
    );
    if (mainOption) {
      setOpenDropdown(mainOption.label);
    }
  }, []);

  return (
    <Sidebar
      {...props}
      onMouseLeave={() => {
        if (isHoverOpen) {
          setOpen(false);
          toggleMouseEvent(false);
        }
      }}
      className="flex flex-col content-between"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="p-2 pt-0">
            {sidebarOptions.map(({ label, path, Icon, children }) => (
              <Collapsible
                key={label}
                asChild
                open={children ? label === openDropdown : undefined}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className={`py-6 font-normal text-black cursor-pointer transition-all duration-300  ${
                        activeOption === path
                          ? "bg-[var(--sidebar-selected-option-bg)] text-white hover:bg-[var(--sidebar-selected-option-bg)] hover:text-white"
                          : !children
                          ? "hover:bg-[var(--sidebar-hover-option-bg)] hover:text-white"
                          : ""
                      }`}
                      onClick={() => {
                        if (children?.length) {
                          if (label !== openDropdown) {
                            setOpenDropdown(label);
                          } else {
                            setOpenDropdown(null);
                          }
                        } else {
                          setActiveOption(path);
                        }
                      }}
                    >
                      {children ? (
                        <div className="font-normal text-base flex items-center">
                          {Icon && <Icon />}
                          <span>{label}</span>
                          <ChevronDown
                            className={`ml-auto transition-transform duration-200 ${
                              openDropdown === label ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                      ) : (
                        <Link
                          to={path}
                          className="font-normal text-base flex items-center"
                        >
                          {Icon && (
                            <Icon
                              // color={`${
                              //   activeOption === path ? "white" : "black"
                              // }`}
                              className={`transition-colors duration-200 ${
                                activeOption.includes(path)
                                  ? "text-white"
                                  : "text-black"
                              } 
                      hover:text-white `}
                            />
                          )}
                          <span>{label}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {children && openDropdown === label ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton
                              asChild
                              className={`pl-5 cursor-pointer py-5 transition-all duration-300  ${
                                activeOption === path + child.path
                                  ? "bg-[var(--sidebar-selected-option-bg)] text-white hover:bg-[var(--sidebar-selected-option-bg)] hover:text-white"
                                  : "text-[var(--unselected-sidebar-option-text-color)] hover:bg-[var(--sidebar-hover-option-bg)] hover:text-white"
                              } font-normal text-sm`}
                              onClick={() =>
                                setActiveOption(`${path}${child.path}`)
                              }
                            >
                              <Link to={`${path}${child.path}`}>
                                {child.label}
                              </Link>
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
      <SidebarFooter className={"relative"}>
        <img
          src={COLLAPSABLE_ICON}
          width="40px"
          height="40px"
          className={`absolute right-[-15px] top-[-7px] z-30 cursor-pointer transition-transform duration-200 ${
            open ? "rotate-0" : "rotate-180"
          }`}
          onClick={() => {
            toggleSidebar();
            toggleMouseEvent(false);
          }}
        />
        <Separator className="" />
        <SidebarMenuButton asChild>
          <Link to="/help" className="font-medium">
            {/* <span className="pr-2">{""}</span> */}
            <img src={BULB_ICON} width="20px" height="20px" />
            <span className="font-medium">Help</span>
          </Link>
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
