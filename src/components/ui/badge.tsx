import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type BadgeProps = ComponentProps<"span"> & {
  variant?: "default" | "primary";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-body-sm font-medium leading-[1.35]",
        variant === "default" &&
          "border-border bg-card text-foreground",
        variant === "primary" &&
          "border-primary-600 bg-primary-600 text-neutral-0",
        className,
      )}
      {...props}
    />
  );
}
