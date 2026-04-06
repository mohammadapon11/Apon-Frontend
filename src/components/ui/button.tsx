import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
} from "react";

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "border border-transparent bg-primary-500 text-neutral-0 hover:bg-primary-600 active:bg-primary-700",
  secondary:
    "border border-transparent bg-[#171B21] text-neutral-0 hover:bg-neutral-700 active:bg-neutral-600",
  outline:
    "border-0 bg-transparent text-primary-400 hover:text-primary-300 active:text-primary-500 font-medium",
} as const;

const sizes = {
  sm: "min-h-8 gap-1.5 rounded-ui-sm px-3 text-body-sm",
  md: "min-h-10 gap-2 rounded-ui-md px-4 text-body",
  lg: "min-h-12 gap-2 rounded-ui-lg px-6 text-body leading-[1.35]",
} as const;

export type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (asChild) {
    const child = Children.only(children);
    if (!isValidElement(child)) {
      throw new Error("Button with asChild expects a single React element child.");
    }
    const el = child as ReactElement<{ className?: string }>;
    return cloneElement(el, {
      className: cn(classes, el.props.className),
    });
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
