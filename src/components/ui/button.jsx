import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const bulmaClasses = ["button"]

  if (variant) {
    switch (variant) {
      case "default":
        bulmaClasses.push("is-primary")
        break
      case "destructive":
        bulmaClasses.push("is-danger")
        break
      case "outline":
        bulmaClasses.push("is-outlined")
        break
      case "secondary":
        bulmaClasses.push("is-light")
        break
      case "ghost":
        bulmaClasses.push("is-ghost")
        break
      case "link":
        bulmaClasses.push("is-link")
        break
      default:
        bulmaClasses.push("is-primary")
    }
  }

  if (size) {
    switch (size) {
      case "sm":
        bulmaClasses.push("is-small")
        break
      case "lg":
        bulmaClasses.push("is-large")
        break
      default:
        break
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
Button.displayName = "Button"

export { Button }
