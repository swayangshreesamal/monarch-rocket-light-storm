import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "hud-btn inline-flex items-center justify-center gap-2 font-medium disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
  {
    variants: {
      variant: {
        primary: "hud-btn-light",
        accent: "hud-btn-accent",
        ghost: "bg-transparent text-fg",
        subtle: "",
        danger: "border-danger/40 text-danger",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-md",
        lg: "h-12 px-6 text-[15px] rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
