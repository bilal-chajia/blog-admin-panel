import * as React from "react"
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";

import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()
  const classNames = ["field"]
  if (className) classNames.push(className)

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={classNames.join(" ")} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef((props, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    const child = React.Children.only(props.children);
    const newClassName = [
        child.props.className,
        error ? 'is-danger' : null
    ].filter(Boolean).join(' ');

    return (
        <div className="control">
            {React.cloneElement(child, {
                ref,
                id: formItemId,
                'aria-describedby': !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
                'aria-invalid': !!error,
                className: newClassName,
            })}
        </div>
    );
});
FormControl.displayName = "FormControl";


const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  const classNames = ["help"]
  if (className) classNames.push(className)

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={classNames.join(" ")}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  const classNames = ["help", "is-danger"]
  if (className) classNames.push(className)

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={classNames.join(" ")}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
