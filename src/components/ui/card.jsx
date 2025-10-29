import * as React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card"]
  if (className) classNames.push(className)
  return <div ref={ref} className={classNames.join(" ")} {...props} />
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card-header"]
  if (className) classNames.push(className)
  return <header ref={ref} className={classNames.join(" ")} {...props} />
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card-header-title"]
  if (className) classNames.push(className)
  return <div ref={ref} className={classNames.join(" ")} {...props} />
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["subtitle", "is-6"]
  if (className) classNames.push(className)
  return <p ref={ref} className={classNames.join(" ")} {...props} />
})
CardDescription.displayName = "CardDescription"

const CardAction = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card-header-icon"]
  if (className) classNames.push(className)
  return <a ref={ref} className={classNames.join(" ")} {...props} />
})
CardAction.displayName = "CardAction"

const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card-content"]
  if (className) classNames.push(className)
  return <div ref={ref} className={classNames.join(" ")} {...props} />
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  const classNames = ["card-footer"]
  if (className) classNames.push(className)
  return <footer ref={ref} className={classNames.join(" ")} {...props} />
})
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
