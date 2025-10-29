import React, { createContext, useContext, useState } from "react";
import { Button } from "./button.jsx";

const AlertDialogContext = createContext();

const useAlertDialog = () => useContext(AlertDialogContext);

const AlertDialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <AlertDialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = ({ children }) => {
  const { open } = useAlertDialog();
  return React.cloneElement(children, { onClick: open });
};

const AlertDialogContent = ({ children, ...props }) => {
  const { isOpen, close } = useAlertDialog();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card" {...props}>
        {children}
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={close}></button>
    </div>
  );
};

const AlertDialogHeader = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-head"];
    if (className) classNames.push(className);
    return <header ref={ref} className={classNames.join(" ")} {...props} />;
});
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-foot"];
    if (className) classNames.push(className);
    return <footer ref={ref} className={classNames.join(" ")} {...props} />;
});
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => {
    const classNames = ["modal-card-title"];
    if (className) classNames.push(className);
    return <p ref={ref} className={classNames.join(" ")} {...props} />;
});
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <section ref={ref} className={`modal-card-body ${className}`} {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => {
  const { close } = useAlertDialog();
  return <Button ref={ref} className={`is-success ${className}`} onClick={close} {...props} />;
});
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => {
  const { close } = useAlertDialog();
  return <Button ref={ref} className={`is-light ${className}`} onClick={close} {...props} />;
});
AlertDialogCancel.displayName = "AlertDialogCancel";


export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  useAlertDialog
};
