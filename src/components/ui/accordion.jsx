import React, { createContext, useContext, useState, useId } from "react";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

const Accordion = ({ children, type = "single", defaultValue, value, onValueChange, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || (type === "multiple" ? [] : null));

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (itemId) => {
    let newValue;
    if (type === "multiple") {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(itemId)) {
        newValue = currentArray.filter((item) => item !== itemId);
      } else {
        newValue = [...currentArray, itemId];
      }
    } else {
      newValue = currentValue === itemId ? null : itemId;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, value: currentValue, onValueChange: handleValueChange }}>
      <div {...props}>{children}</div>
    </AccordionContext.Provider>
  );
};


const AccordionItem = ({ children, value, className, ...props }) => {
    const id = useId();
    const itemValue = value || id;

    return (
        <AccordionItemContext.Provider value={{ value: itemValue }}>
            <article className={`message ${className || ''}`} {...props}>
                {children}
            </article>
        </AccordionItemContext.Provider>
    );
};

const AccordionTrigger = ({ children, className, ...props }) => {
    const { value, onValueChange, type } = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);
    const isOpen = type === 'multiple' ? (value && value.includes(itemContext.value)) : value === itemContext.value;

    return (
        <header
            className={`message-header ${className || ''}`}
            onClick={() => onValueChange(itemContext.value)}
            style={{ cursor: 'pointer' }}
            {...props}
        >
            <p>{children}</p>
            <span className="icon is-small">
              {isOpen ? '▲' : '▼'}
            </span>
        </header>
    );
};


const AccordionContent = ({ children, className, ...props }) => {
    const { value, type } = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);
    const isOpen = type === 'multiple' ? (value && value.includes(itemContext.value)) : value === itemContext.value;

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`message-body ${className || ''}`} {...props}>
            <div className="content">{children}</div>
        </div>
    );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
