import * as React from "react"

const Progress = React.forwardRef(({ className, value, max, color, size, ...props }, ref) => {
  const classNames = ["progress"]
  if (color) classNames.push(`is-${color}`)
  if (size) classNames.push(`is-${size}`)
  if (className) classNames.push(className)

  return (
    <progress
      ref={ref}
      className={classNames.join(" ")}
      value={value}
      max={max}
      {...props}
    />
  )
})
Progress.displayName = "Progress"

export { Progress }
