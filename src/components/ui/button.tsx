import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "hf-button",
  {
    variants: {
      variant: {
        default: "hf-button-default",
        destructive: "hf-button-destructive",
        outline: "hf-button-outline",
        secondary: "hf-button-secondary",
        ghost: "hf-button-ghost",
        link: "hf-button-link",
        success: "hf-button-success",
      },
      size: {
        default: "hf-button-md",
        xs: "hf-button-xs",
        sm: "hf-button-sm",
        lg: "hf-button-lg",
        icon: "hf-button-icon",
        "icon-xs": "hf-button-icon-xs",
        "icon-sm": "hf-button-icon-sm",
        "icon-lg": "hf-button-icon-lg",
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
