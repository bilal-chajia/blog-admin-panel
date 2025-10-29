import * as React from "react"

const Label = React.forwardRef(({ className, size, ...props }, ref) => {
  const bulmaClasses = ["label"]

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
    <label
      className={bulmaClasses.join(" ")}
      ref={ref}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label }
