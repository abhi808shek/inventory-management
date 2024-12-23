import INVENTORY_IMG from "../../assets/images/inventory_img.png";
import LOGO from "../../assets/images/logo.png";
import { Outlet } from "react-router-dom";
const LoginLayout = () => {
  return (
    <div className="grid min-h-svh sm:grid-cols-2">
      <div className="relative hidden bg-muted sm:block">
        <img
          src={INVENTORY_IMG}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-2 sm:p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col sm:gap-6 ">
          <div className="flex h-[200px] sm:h-20 w-full items-center justify-center rounded-md text-primary-foreground relative">
            <img src={LOGO} alt="" className="z-[9999]" />
            <img
              src={INVENTORY_IMG}
              alt="Image"
              className="absolute sm:hidden h-[100%] w-[95%] object-cover dark:brightness-[0.2] rounded-md dark:grayscale"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
