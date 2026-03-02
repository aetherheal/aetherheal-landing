import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        navy: "bg-brand-navy text-white border border-brand-navy hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)]",
        outline:
          "bg-transparent text-brand-navy border border-brand-navy hover:bg-bg-light hover:-translate-y-0.5",
        gold: "bg-brand-gold text-white border border-brand-gold hover:bg-amber-600 hover:-translate-y-0.5",
        ghost: "bg-transparent text-text-body hover:bg-slate-100",
        danger: "bg-danger text-white border border-danger hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 rounded text-xs",
        md: "h-11 px-6 rounded-md text-sm",
        lg: "h-12 px-8 rounded-md text-sm",
      },
    },
    defaultVariants: {
      variant: "navy",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

export { buttonVariants }
