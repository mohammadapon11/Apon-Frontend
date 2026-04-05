import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "border border-transparent bg-primary-500 text-neutral-0 hover:bg-primary-600 active:bg-primary-700",
  secondary:
    "border border-border bg-neutral-800 text-primary-500 hover:bg-neutral-700",
  ghost:
    "border border-neutral-0/40 bg-transparent text-neutral-0 hover:bg-alpha-white-30",
} as const;

const sizes = {
  sm: "size-8 [&_svg]:size-3.5",
  md: "size-10 [&_svg]:size-4",
  lg: "size-12 [&_svg]:size-5",
} as const;

export type IconButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function IconButton({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
