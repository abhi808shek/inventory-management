import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginSchema } from "@/validations/auth.validation";
import { LoginIFormInputs } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth.api";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<LoginIFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  // Toaster

  // Handling Login Mutations
  const { mutate: loginFunction, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast(data?.data?.message ?? "Loggedin successfull");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // onHandle Login Form
  const onSubmit = (data: LoginIFormInputs) => {
    loginFunction(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as "email" | "password";
    const value = event.target.value;
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Card>
        <CardHeader className="sm:pb-5">
          <CardTitle className="text-xl">Welcome Back 👋</CardTitle>
          <CardDescription>
            Today is a new day. It's your day. You shape it. Log in to start
            managing your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                {/* Email Field Section */}
                <div className="grid gap-1 mb-2">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Example@email.com"
                    error={!!errors.email}
                    {...register("email")}
                    onChange={handleChange}
                  />
                  <p className="h-3 sm:h-1 text-red-500 text-xs pl-1">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Password Field Section */}
                <div className="grid gap-1 mb-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline text-[#5D54C9]"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="At least 8 characters"
                    error={!!errors.password}
                    onChange={handleChange}
                  />
                  <p className="h-3 sm:h-1 text-red-500 text-xs pl-1">
                    {errors.password?.message}
                  </p>
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center bg-[#5D54C9]"
                >
                  {isPending ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or Log in with
                  </span>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 my-2">
                  <Button variant="outline" className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="3.481 .893 493.038 548.124"
                      id="apple"
                    >
                      <path
                        fill="#61bb46"
                        stroke="#61bb46"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M25.824 200.612c.166-.273.342-.542.519-.806 28.447-43.799 73.32-69.433 115.518-69.433 42.969 0 69.979 23.554 105.497 23.554 34.463 0 55.454-23.589 105.132-23.589 37.535 0 77.329 20.44 105.675 55.781-7.837 4.292-14.907 9.165-21.227 14.521l-411.114-.028z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="#61bb46"
                        stroke="#61bb46"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M314.808 90.875c18.033-23.158 31.748-55.859 26.777-89.291-29.481 2.021-63.964 20.79-84.105 45.225-18.276 22.197-33.364 55.117-27.49 87.095 32.187 1 65.482-18.219 84.818-43.029z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="#fdb827"
                        d="M27.539 199.085c-12.09 19.022-20.456 46.286-22.677 70.198l392.242-.01c4.241-26.16 18.344-51.156 40.695-70.158l-410.26-.03h.023-.023z"
                      ></path>
                      <path
                        fill="#f5821f"
                        stroke="#f5821f"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M4.989 340.999c-3.862-24.644-4.487-48.403-2.061-70.201l394.341-.01c-3.856 23.638-.619 48.237 9.136 70.225l-401.416-.014z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="#e03a3e"
                        stroke="#e03a3e"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M24.261 411.193c-9.312-23.584-15.688-47.271-19.272-70.195l401.416.015c12.427 28.018 35.425 51.821 67.808 64.053-.962 2.139-1.89 4.185-2.782 6.157l-447.17-.03z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="#963d97"
                        stroke="#963d97"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M471.43 411.222c-11.118 24.443-17.563 37.129-32.949 60.547a605.045 605.045 0 0 1-6.436 9.609l-370.528.034a850.124 850.124 0 0 1-3.521-5.288c-13.853-21.099-25.068-42.974-33.735-64.932l447.169.03z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="none"
                        stroke="#000"
                        strokeMiterlimit="2.613"
                        strokeWidth="3.895"
                        d="M472.972 550.778c13.589 0 24.604-11.016 24.604-24.595 0-13.589-11.016-24.601-24.604-24.601s-24.604 11.012-24.604 24.601c0 13.579 11.016 24.595 24.604 24.595m-6.992-9.649v-27.484h11.011m6.645 27.182l-6.552-13.892m-11.055-.244h11.006m-.01-.034c2.734 0 5.502-2.891 5.502-6.46 0-3.8-2.885-6.554-5.536-6.554"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                      <path
                        fill="#009ddc"
                        stroke="#009ddc"
                        strokeMiterlimit="2.613"
                        strokeWidth="2.985"
                        d="M432.045 481.379c-22.667 33.203-53.096 69.741-90.021 70.087-36.03.327-45.273-23.447-94.155-23.179-48.882.273-59.087 23.594-95.117 23.257-38.52-.356-68.433-36.24-91.235-70.132l370.528-.033z"
                        transform="matrix(.98693 0 0 .99106 3.5 .907)"
                      ></path>
                    </svg>
                    Apple
                  </Button>
                  <Button variant="outline" className="w-full ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 262"
                      id="google"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 text-[#5D54C9]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
