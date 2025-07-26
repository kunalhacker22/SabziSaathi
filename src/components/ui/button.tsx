import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-market hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-lg",
        outline:
          "border-2 border-primary/20 bg-background text-primary shadow-card hover:bg-primary/5 hover:border-primary/40 hover:shadow-market",
        secondary:
          "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/80 hover:shadow-lg",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        market: 
          "bg-gradient-market text-white shadow-market hover:shadow-warm hover:scale-105 active:scale-95 font-semibold",
        fresh:
          "bg-gradient-fresh text-white shadow-market hover:opacity-90 hover:scale-105 active:scale-95",
        warm:
          "bg-gradient-warm text-white shadow-warm hover:opacity-90 hover:scale-105 active:scale-95",
        trust:
          "bg-trust text-trust-foreground shadow-market hover:bg-trust/90 hover:shadow-lg hover:scale-105 active:scale-95",
        accent:
          "bg-accent text-accent-foreground shadow-warm hover:bg-accent/90 hover:shadow-lg hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-md px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg font-semibold",
        icon: "h-12 w-12",
        xl: "h-16 rounded-xl px-10 text-xl font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
