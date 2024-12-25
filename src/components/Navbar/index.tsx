import { FC } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LOGO from "../../assets/images/logo.png";
import { useSidebar } from "@/components/ui/sidebar";

type PROP_TYPES = {
  setOpen: (open: boolean) => void;
};

const Navbar: FC<PROP_TYPES> = ({ setOpen }) => {
  const { toggleMouseEvent, toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-between w-full h-[60px] px-5 shadow-md mb-2">
      <div className="flex w-1/2 items-center h-full gap-3">
        <Menu
          className="block md:hidden h-5"
          onClick={() => {
            toggleSidebar();
          }}
        />
        <img src={LOGO} alt="Logo" className="h-[60%] md:h-[80%]" />
      </div>
      <div className="w-1/2 flex justify-end items-center gap-6">
        <Search onClick={() => setOpen(true)} />
        <Bell className="hidden md:block h-5" />
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
  );
};

export default Navbar;
