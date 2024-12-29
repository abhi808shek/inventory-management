import { FC } from "react";
import {
  Search,
  Bell,
  Menu,
  MoveLeft,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LOGO from "@/assets/images/logo.png";
import { useSidebar } from "@/components/ui/sidebar";
import { MENU_OPTIONS } from "@/assets/data/menuOptions";
import { useNavigate } from "react-router-dom";
import { setUserData } from "@/store/user/user-reducer";
import { useDispatch } from "react-redux";
type PROP_TYPES = {
  setOpen: (open: boolean) => void;
};

const Navbar: FC<PROP_TYPES> = ({ setOpen }) => {
  const { toggleSidebar, openMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const STATIC_USER = {
    name: "vidu.pareek2000",
    email: "vidu.pareek2000@gmail.com",
    avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png",
  };

  const logoutFunc = () => {
    dispatch(setUserData(null));

    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex justify-between w-full h-[60px] px-5 shadow-md mb-2">
      <div className="flex w-1/2 items-center h-full gap-3">
        {openMobile ? (
          <MoveLeft
            onClick={() => {
              toggleSidebar();
            }}
          />
        ) : (
          <Menu
            className="block md:hidden h-5"
            onClick={() => {
              toggleSidebar();
            }}
          />
        )}
        <img src={LOGO} alt="Logo" className="h-[60%] md:h-[70%]" />
      </div>
      <div className="w-1/2 flex justify-end items-center gap-6">
        <Search className="cursor-pointer" onClick={() => setOpen(true)} />
        <Bell className="cursor-pointer hidden md:block h-5" />
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              {/* Check if the avatar URL exists */}
              {STATIC_USER.avatar ? (
                <AvatarImage src={STATIC_USER.avatar} alt="User Avatar" />
              ) : (
                <AvatarFallback>
                  {STATIC_USER.name[0].toUpperCase()}
                  {STATIC_USER.name[STATIC_USER.name.length - 1].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-65 relative right-5">
            {/* Account Title */}
            <div className="text-gray-500 text-sm font-semibold pb-4">
              Account
            </div>

            {/* Header */}
            <div className="flex items-center pb-4">
              {STATIC_USER.avatar ? (
                <img
                  src={STATIC_USER.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
              ) : (
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 mr-4 text-lg font-bold text-white">
                  {STATIC_USER.name[0].toUpperCase()}
                  {STATIC_USER.name[STATIC_USER.name.length - 1].toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-medium text-lg">{STATIC_USER.name}</span>
                <span className="text-sm text-gray-500">
                  {STATIC_USER.email}
                </span>
              </div>
            </div>

            {/* Manage Account Option */}
            <div className="flex items-center justify-between mt-3 mb-3 pb-7 pl-2 border-b">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              >
                Manage account
              </a>
              <SquareArrowOutUpRight width="15px" height="15px" />
            </div>

            {/* Menu Options */}
            <ul>
              {MENU_OPTIONS.map((option) => (
                <li
                  key={option.key}
                  className={` ${
                    option.key === "logout" ? "border-t mt-2 pt-2" : ""
                  }`}
                >
                  <div
                    className="flex justify-between items-center text-gray-700 hover:text-white py-2 pl-2 hover:bg-[#5159B8] mb-1 hover:rounded-lg cursor-pointer"
                    onClick={() => option.key === "logout" && logoutFunc()}
                  >
                    {option.label}
                    {option.new && (
                      <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
