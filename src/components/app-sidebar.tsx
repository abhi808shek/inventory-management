import {
  ComponentProps,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const [activeOption, setActiveOption] = useState("/dashboard");

  const { setOpen, toggleMouseEvent, isHoverOpen } = useSidebar();

  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return path === pathname;
  };

  // const sidebarRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const activeElement = sidebarRef.current?.querySelector(".active");
  //   if (activeElement) {
  //     const { offsetTop, offsetHeight } = activeElement as HTMLElement;
  //     setActivePosition({ top: offsetTop, height: offsetHeight });
  //   }
  // }, [pathname]);

  useEffect(() => {
    setActiveOption(pathname);
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
    >
      {/* <div
        className="absolute left-0 w-full bg-blue-600 transition-all duration-300"
        style={{
          top: `${activePosition.top}px`,
          height: `${activePosition.height}px`,
        }}
      ></div> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="p-5">
            {sidebarOptions.map(({ label, path, Icon, children }) => (
              <Collapsible
                key={label}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className={`py-6 transition-all duration-300 ${
                        activeOption === path
                          ? "bg-[var(--sidebar-selected-option-bg)] text-white hover:bg-[var(--sidebar-selected-option-bg)] hover:text-white"
                          : "hover:bg-[var(--sidebar-hover-option-bg)] hover:text-white"
                      }`}
                      onClick={() =>
                        setActiveOption(
                          children?.length ? path + children[0].path : path
                        )
                      }
                    >
                      <Link
                        to={children?.length ? path + children[0].path : path}
                        className="font-medium flex items-center"
                      >
                        {Icon && (
                          <Icon
                            color={`${
                              activeOption === path ? "white" : "black"
                            }`}
                          />
                        )}
                        <span>{label}</span>
                        {children?.length ? (
                          <ChevronRight
                            className={`ml-auto transition-transform duration-200 ${
                              activeOption.includes(path)
                                ? "rotate-0"
                                : "rotate-90"
                            }`}
                          />
                        ) : null}
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {children?.length && activeOption.includes(path) ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton
                              asChild
                              className={`py-5 transition-all duration-300 ${
                                activeOption === path + child.path
                                  ? "bg-[var(--sidebar-selected-option-bg)] text-white hover:bg-[var(--sidebar-selected-option-bg)] hover:text-white"
                                  : "hover:bg-[var(--sidebar-hover-option-bg)] hover:text-white"
                              }`}
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
