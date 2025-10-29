import * as React from "react"

const Select = React.forwardRef(({ className, children, size, color, isRounded, isLoading, ...props }, ref) => {
  const containerClasses = ["select"]
  if (size) containerClasses.push(`is-${size}`)
  if (color) containerClasses.push(`is-${color}`)
  if (isRounded) containerClasses.push("is-rounded")
  if (isLoading) containerClasses.push("is-loading")

  return (
    <div className={containerClasses.join(" ")}>
      <select ref={ref} className={className} {...props}>
        {children}
      </select>
    </div>
  )
})
Select.displayName = "Select"

const SelectItem = React.forwardRef((props, ref) => {
    return <option ref={ref} {...props} />
})
SelectItem.displayName = "SelectItem"

const SelectGroup = React.forwardRef(({label, ...props}, ref) => {
    return <optgroup ref={ref} label={label} {...props} />
})
SelectGroup.displayName = "SelectGroup"

const SelectLabel = React.forwardRef((props, ref) => {
    return <label ref={ref} {...props} className="label" />
})
SelectLabel.displayName = "SelectLabel"


export { Select, SelectItem, SelectGroup, SelectLabel }
