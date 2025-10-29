import * as React from "react"

const Textarea = React.forwardRef(({ className, size, ...props }, ref) => {
  const bulmaClasses = ["textarea"]

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
    <textarea
      className={bulmaClasses.join(" ")}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
