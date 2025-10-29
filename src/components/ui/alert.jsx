import * as React from "react"

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => {
  const bulmaClasses = ["message"]

  if (variant) {
    switch (variant) {
      case "destructive":
        bulmaClasses.push("is-danger")
        break
      default:
        bulmaClasses.push("is-info")
    }
  }

  if (className) {
    bulmaClasses.push(className)
  }

  return (
    <article
      ref={ref}
      role="alert"
      className={bulmaClasses.join(" ")}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["message-header"]
    if(className) classNames.push(className)
    return (
        <div
            ref={ref}
            className={classNames.join(" ")}
            {...props}
        />
    )
})
AlertTitle.displayName = "AlertTitle"


const AlertDescription = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["message-body"]
    if(className) classNames.push(className)
    return (
        <div
            ref={ref}
            className={classNames.join(" ")}
            {...props}
        />
    )
})
AlertDescription.displayName = "AlertDescription"


export { Alert, AlertTitle, AlertDescription }
