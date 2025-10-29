import * as React from "react"

const Input = React.forwardRef(({ className, type, size, ...props }, ref) => {
  const bulmaClasses = ["input"]

  if (size) {
    switch (size) {
      case "sm":
        bulmaClasses.push("is-small")
        break
      case "lg":
        bulmaClasses.push("is-large")
        break
      case "md":
        bulmaClasses.push("is-medium")
        break
      default:
        break
    }
  }

  if (className) {
    bulmaClasses.push(className)
  }

  return (
    <input
      type={type}
      className={bulmaClasses.join(" ")}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
