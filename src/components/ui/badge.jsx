import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Badge = React.forwardRef(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "span"
  const bulmaClasses = ["tag"]

  if (variant) {
    switch (variant) {
      case "default":
        bulmaClasses.push("is-primary")
        break
      case "secondary":
        bulmaClasses.push("is-light")
        break
      case "destructive":
        bulmaClasses.push("is-danger")
        break
      case "outline":
        bulmaClasses.push("is-light")
        break
      default:
        bulmaClasses.push("is-primary")
    }
  }

  if (className) {
    bulmaClasses.push(className)
  }

  return (
    <Comp
      className={bulmaClasses.join(" ")}
      ref={ref}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
