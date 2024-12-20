import { Outlet } from "react-router-dom";
import IMAGE from "../../assets/images/inventory_img.png";
import LOGO from "../../assets/images/logo.png";

const AuthLayout = () => {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] lg:grid-cols-2 lg:grid-rows-1 relative">
      {/* Image Section */}
      <div className="relative h-[200px] lg:h-auto lg:block content-center">
        <img
          src={IMAGE}
          alt="Image"
          className="absolute inset-0 h-full w-full object-none m-auto md:object-cover dark:brightness-[0.2] dark:grayscale"
        />
        {/* Logo Overlay for Mobile */}
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <img src={LOGO} alt="Logo" className="h-16 md:h-16" />
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex flex-col gap-2 p-6 md:p-10 md:gap-1">
        {/* Logo Above Form for Web View */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:flex hidden">
          <img src={LOGO} alt="Logo" className="h-16 md:h-14" />
        </div>
        <div className="flex justify-center gap-2 md:justify-start pt-2 lg:pt-0"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
