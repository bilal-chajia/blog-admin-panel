import * as React from "react"
import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

const useDialog = () => useContext(DialogContext)

const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = ({ children }) => {
  const { open } = useDialog()
  return React.cloneElement(children, { onClick: open })
}

const DialogContent = ({ children, ...props }) => {
  const { isOpen, close } = useDialog()

  if (!isOpen) {
    return null
  }

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card" {...props}>
        {children}
      </div>
    </div>
  )
}

const DialogHeader = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-head"]
    if (className) classNames.push(className)
    return <header ref={ref} className={classNames.join(" ")} {...props} />
})
DialogHeader.displayName = "DialogHeader"


const DialogFooter = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-foot"]
    if (className) classNames.push(className)
    return <footer ref={ref} className={classNames.join(" ")} {...props} />
})
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-title"]
    if (className) classNames.push(className)
    return <p ref={ref} className={classNames.join(" ")} {...props} />
})
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <section ref={ref} className={`modal-card-body ${className}`} {...props} />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = () => {
  const { close } = useDialog()
  return <button className="modal-close is-large" aria-label="close" onClick={close}></button>
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useDialog
}
