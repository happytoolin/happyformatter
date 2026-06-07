import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none ring-offset-background transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 data-[loading=true]:pointer-events-none data-[loading=true]:translate-y-0",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-card text-foreground hover:border-foreground hover:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>
{
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      loadingText,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        aria-busy={isLoading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        data-loading={isLoading ? "true" : undefined}
        disabled={!asChild ? isDisabled : undefined}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <Loader2
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        )}
        {isLoading && loadingText ? loadingText : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
