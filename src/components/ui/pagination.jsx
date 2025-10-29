import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

const Pagination = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={`pagination ${className}`}
    {...props}
  />
))
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <ul
    ref={ref}
    className={`pagination-list ${className}`}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef((
  { ...props },
  ref
) => <li ref={ref} {...props} />)
PaginationItem.displayName = "PaginationItem"

const PaginationLink = React.forwardRef(({
  className,
  isActive,
  ...props
}, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={`pagination-link ${isActive ? "is-current" : ""} ${className}`}
    {...props}
  />
))
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <a
    ref={ref}
    aria-label="Go to previous page"
    className={`pagination-previous ${className}`}
    {...props}
  >
    <ChevronLeftIcon />
    <span>Previous</span>
  </a>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <a
    ref={ref}
    aria-label="Go to next page"
    className={`pagination-next ${className}`}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon />
  </a>
))
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={`pagination-ellipsis ${className}`}
    {...props}
  >
    <MoreHorizontalIcon />
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
