import * as React from "react"

const Checkbox = React.forwardRef(({ className, label, ...props }, ref) => {
  const classNames = ["checkbox"]
  if (className) classNames.push(className)

  return (
    <label className={classNames.join(" ")}>
      <input
        ref={ref}
        type="checkbox"
        {...props}
      />
      {label && ` ${label}`}
    </label>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
