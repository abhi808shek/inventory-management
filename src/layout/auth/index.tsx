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
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-2 sm:p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex h-50 w-full items-center justify-center rounded-md text-primary-foreground">
            <img src={LOGO} alt="" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
