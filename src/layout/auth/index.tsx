import INVENTORY_IMG from "../../assets/images/inventory_img.jpg";
import LOGO from "../../assets/images/logo.png";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="grid min-h-svh grid-cols-1 sm:grid-cols-[40%,60%]">
      {/* Left Image Section with Overlay */}
      <div className="relative hidden bg-muted sm:block">
        <img
          src={INVENTORY_IMG}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-60"></div>
      </div>
      {/* Right Content Section */}
      <div className="flex min-h-svh bg-yellow-200-600 flex-col items-center justify-center sm:p-6 md:p-10">
        <div className="flex max-w-[500px] flex-col justify-center align-middle">
          <div className="flex h-[180px] w-full sm:h-20 items-center justify-center rounded-[1.75rem] text-primary-foreground relative mt-4">
            <img src={LOGO} alt="" className="z-[9999]" />
            <img
              src={INVENTORY_IMG}
              alt="Image"
              className="absolute sm:hidden h-[180px] min-w-[340px] object-cover dark:brightness-[0.2] rounded-3xl dark:grayscale "
            />
            {/* Overlay */}
            <div className="absolute h-[180px] mx-auto max-w-[340px] rounded-3xl inset-0 bg-black opacity-50 dark:opacity-60 sm:hidden"></div>
          </div>
          <div style={{ height: "calc(100vh - 180px)" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
