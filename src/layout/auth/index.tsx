import INVENTORY_IMG from "../../assets/images/inventory_img.jpg";
import LOGO from "../../assets/images/logo.png";
import { Outlet } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        <div className="flex max-w-[500px] flex-col justify-center items-center">
          <div className="flex w-[90%] sm:h-20 items-center justify-center rounded-3xl text-primary-foreground  responsive-image">
            <AspectRatio
              ratio={16 / 9}
              className="relative flex justify-center items-center rounded-3xl"
            >
              <img src={LOGO} alt="" className="absolute z-[9999]" />
              <img
                src={INVENTORY_IMG}
                alt="Image"
                className=" sm:hidden w-full h-full object-cover rounded-3xl"
              />
            </AspectRatio>
          </div>
          <div
            className="outlet-wrapper"
            style={{ height: "calc(100vh - 180px)" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
