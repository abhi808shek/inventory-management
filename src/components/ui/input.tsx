import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordType = type === "password";

    return (
      <div className="relative">
        <input
          type={isPasswordType && showPassword ? "text" : type}
          className={cn(
            `border-[1px] mt-1 h-12 flex w-full rounded-md border-input bg-[var(--input-bg-color)] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              error ? "border-red-500" : "border-[var(--input-border-color)]"
            } focus:outline-none`,
            className
          )}
          ref={ref}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#8897AD"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.032.107-.065.213-.1.318m-2.878 4.1C16.263 18.283 14.234 19 12 19c-4.478 0-8.268-2.943-9.542-7a12.093 12.093 0 01-.1-.318m15.624 3.618A3 3 0 0019.1 16.1m-2.193 1.193L3.877 4.877"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#8897AD"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.5c7.667 1 10 7.5 10 7.5s-2.333 6.5-10 7.5C4.333 17 2 12.5 2 12.5s2.333-6.5 10-7.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9.5a3 3 0 100 6 3 3 0 000-6z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
