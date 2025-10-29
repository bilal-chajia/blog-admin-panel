import * as React from "react"

const Table = React.forwardRef(({ className, isBordered, isStriped, isNarrow, isHoverable, isFullwidth, ...props }, ref) => {
  const tableClasses = ["table"]
  if (isBordered) tableClasses.push("is-bordered")
  if (isStriped) tableClasses.push("is-striped")
  if (isNarrow) tableClasses.push("is-narrow")
  if (isHoverable) tableClasses.push("is-hoverable")
  if (isFullwidth) tableClasses.push("is-fullwidth")
  if (className) tableClasses.push(className)

  return (
    <div className="table-container">
      <table
        ref={ref}
        className={tableClasses.join(" ")}
        {...props}
      />
    </div>
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={className} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={className} {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ className, isSelected, ...props }, ref) => {
  const classNames = []
  if (isSelected) classNames.push("is-selected")
  if (className) classNames.push(className)

  return (
    <tr
      ref={ref}
      className={classNames.join(" ")}
      {...props}
    />
  )
})
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={className} {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={className} {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={className} {...props} />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
