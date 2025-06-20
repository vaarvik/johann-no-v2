import type { VariantProps } from "class-variance-authority"
import type { IconName } from "@/lib/icons"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import * as React from "react"
import { Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-indigo-700 hover:bg-indigo-800 text-white transition-all duration-150",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-slate-600 text-slate-200 bg-slate-700 hover:bg-slate-600 hover:text-white",
        secondary:
          "border-white/30 text-black bg-white/90 hover:bg-white hover:text-black backdrop-blur-sm ",
        tertiary:
          "bg-slate-800 hover:bg-slate-700 text-white",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 ",
        sm: "h-9 rounded-md gap-2 text-sm px-3 py-2",
        lg: "h-10 rounded-md px-4 font-medium text-base",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ButtonProps extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  startIcon?: IconName
  endIcon?: IconName
  startIconClassName?: string
  endIconClassName?: string
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  startIconClassName,
  startIcon,
  endIcon,
  endIconClassName,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const startIconElement = startIcon && (
    <Icon
      name={startIcon}
      className={cn("transition-all duration-200", startIconClassName || "h-4 w-4")}
    />
  )

  const endIconElement = endIcon && (
    <Icon
      name={endIcon}
      className={cn("transition-all duration-200", endIconClassName || "h-4 w-4")}
    />
  )

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {startIcon && startIconElement}
      {children}
      {endIcon && endIconElement}
    </Comp>
  )
}

export { Button, buttonVariants }
