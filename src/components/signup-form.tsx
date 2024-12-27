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
import { signupSchema } from "@/validations/auth.validation";
import { SignupIFormInputs } from "@/types/auth.types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/api/auth.api";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignupIFormInputs>({
    defaultValues: {
      email: "",
      mobile_number: undefined,
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });
  // Toaster
  // Function to allow only numbers in the input
  const handlePhoneInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove all non-numeric characters
    const numericValue = rawValue.replace(/[^0-9]/g, "");

    // If the length of the numeric value is less than or equal to 10, set the value
    if (numericValue.length <= 10) {
      setValue("mobile_number", numericValue, { shouldValidate: true }); // Set the value using react-hook-form's setValue
    }
  };

  // Handling Sign up Mutations
  const { mutate: signupFunction, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(data?.data?.message ?? "Successfully signedup");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // onHandle Sign up Form
  const onSubmit = (data: SignupIFormInputs) => {
    signupFunction(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as "email" | "password";
    const value = event.target.value;
    setValue(name, value, { shouldValidate: true });
  };

  return (
    <div className={cn("flex flex-col gap-1 ", className)} {...props}>
      <Card>
        <CardHeader className="pb-5">
          <CardTitle className="text-xl sm:text-[22px] font-normal">
            Hello 👋
          </CardTitle>
          <CardDescription className="w-[92%] lg:w-[70%] text-sm font-normal text-[#313957] leading-6">
            Today is a new day. It's your day. You shape it. SignUp to start
            managing your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                {/* Email Field */}
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Example@email.com"
                    {...register("email")}
                    error={!!errors.email}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 font-light text-xs pl-1">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Phone No Field */}
                <div className="grid gap-1">
                  <Label htmlFor="mobile_number">Mobile Number</Label>
                  <Input
                    id="number"
                    type="tel"
                    placeholder="63376578949"
                    {...register("mobile_number")}
                    maxLength={10}
                    onChange={handlePhoneInputChange}
                    error={!!errors.mobile_number}
                  />
                  <p className="text-red-500 font-light text-xs pl-1">
                    {errors.mobile_number?.message}
                  </p>
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center mt-2">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    {...register("password")}
                    error={!!errors.password}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 font-light text-xs pl-1">
                    {errors.password?.message}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#5D54C9] my-2"
                  disabled={isPending}
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
                    "Sign up"
                  )}
                </Button>
                <div className="w-full h-8 flex flex-col text-balance text-center text-[#313957] text-[10px] font-light  my-2">
                  By clicking on ‘Sign up’ you agree to our
                  <span>
                    <a
                      href="#"
                      className="text-[#6DB6CE] text-[10px] font-light"
                    >
                      Terms & Connditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-[#6DB6CE] text-[10px] font-light"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                  <span className="relative z-10 bg-background px-2 text-[#294957]">
                    Or Sign Up with
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-1">
                  <Button variant="socialMedia">
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
              <div className="text-center text-sm text-normal text-[#313957]">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className=" text-[#5D54C9] text-normal text-sm"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
