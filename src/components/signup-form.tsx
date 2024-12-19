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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/api/auth.api";
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
      phoneNumber: undefined,
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });
  // Toaster
  const { toast } = useToast();
  // Function to allow only numbers in the input
  const handlePhoneInputChange = (e: any) => {
    const rawValue = e.target.value;
    // Remove all non-numeric characters
    const numericValue = rawValue.replace(/[^0-9]/g, "");

    // If the length of the numeric value is less than or equal to 10, set the value
    if (numericValue.length <= 10) {
      setValue("phoneNumber", numericValue); // Set the value using react-hook-form's setValue
    }
  };

  // Handling Sign up Mutations
  const { mutate: signupFunction, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: data?.data?.message,
        duration: 3000,
      });
      reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
        duration: 3000,
      });
    },
  });

  // onHandle Sign up Form
  const onSubmit = (data: SignupIFormInputs) => {
    signupFunction(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-xl">Welcome Back 👋</CardTitle>
          <CardDescription>
            Today is a new day. It's your day. You shape it. Log in to start
            managing your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Example@email.com"
                    {...register("email")}
                    className={`${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } border-2 focus:outline-none`}
                  />
                  <p className="h-1 text-red-500 text-xs pl-1">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Phone No Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Mobile Number</Label>
                  <Input
                    id="number"
                    type="tel"
                    placeholder="+91 63376578949"
                    {...register("phoneNumber")}
                    maxLength={10}
                    onChange={handlePhoneInputChange}
                    className={`${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } border-2 focus:outline-none`}
                  />
                  <p className="h-1 text-red-500 text-xs pl-1">
                    {errors.phoneNumber?.message}
                  </p>
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    {...register("password")}
                    className={`${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } border-2 focus:outline-none`}
                  />
                  <p className="h-1 text-red-500 text-xs pl-1">
                    {errors.password?.message}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#5D54C9]"
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
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                  By clicking continue, you agree to our{" "}
                  <a href="#" className="text-[#5D54C9]">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#5D54C9]">
                    Privacy Policy
                  </a>
                  .
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or Sign Up with
                  </span>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="underline underline-offset-4 text-[#5D54C9]"
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
