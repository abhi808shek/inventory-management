import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex bg-[#5D54C9] items-center font-normal justify-center gap-2 whitespace-nowrap rounded-xl text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#5D54C9] text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-red-600 h-[31.83px!important] font-medium text-xs text-white rounded-[6.92px]",
        success:
          "bg-green-600 h-[31.83px!important] font-medium text-xs text-white rounded-[6.92px]",
        filterButton:
          "h-[31.83px!important] font-medium text-xs text-white bg-[#5159B8] rounded-[6.92px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        socialMedia:
          "w-full bg-[var(--input-bg-color)] border-none text-[#313957] font-normal text-sm",
        link: "text-primary underline-offset-4 hover:underline",
        datePicker:
          "bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
