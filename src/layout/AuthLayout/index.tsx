import inventory_img from "../../assets/inventory_img.png";
import logo from "../../assets/logo.png";
import { Outlet } from "react-router-dom";
const LoginLayout = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={inventory_img}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex h-50 w-full items-center justify-center rounded-md text-primary-foreground">
            <img src={logo} alt="" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
