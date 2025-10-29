import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button } from './button.jsx';
import { Input } from './input.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table.jsx';
import { Select, SelectItem } from './select.jsx';
import { Checkbox } from './checkbox.jsx';

const DataTable = ({
  columns,
  data,
  loading = false,
  error = null,
  enableRowSelection = false,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data found',
  onRowSelectionChange,
  onSortingChange,
  onFilteringChange,
  className = '',
}) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState([]);

  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection]);

  React.useEffect(() => {
    if (onSortingChange) {
      onSortingChange(sorting);
    }
  }, [sorting]);

  React.useEffect(() => {
    if (onFilteringChange) {
      onFilteringChange({ globalFilter, columnFilters });
    }
  }, [globalFilter, columnFilters]);

  const table = useReactTable({
    data,
    columns: enableRowSelection
      ? [
          {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onChange={(value) => table.toggleAllPageRowsSelected(!!value.target.checked)}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onChange={(value) => row.toggleSelected(!!value.target.checked)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
          ...columns,
        ]
      : columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    enableRowSelection,
    enableSorting,
    enableFiltering,
    enablePagination,
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  if (error) {
    return (
        <div className="notification is-danger">
            <p className="has-text-weight-bold">Error loading data</p>
            <p>{error}</p>
        </div>
    );
  }

  return (
    <div className={`datatable-container ${className}`}>
      {enableFiltering && (
        <div className="level">
            <div className="level-left">
                <div className="level-item">
                    <div className="field">
                        <div className="control">
                            <Input
                                placeholder={searchPlaceholder}
                                value={globalFilter ?? ''}
                                onChange={(event) => setGlobalFilter(String(event.target.value))}
                                className="input"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {enableRowSelection && Object.keys(rowSelection).length > 0 && (
                <div className="level-right">
                    <div className="level-item">
                        <p>{Object.keys(rowSelection).length} row{Object.keys(rowSelection).length !== 1 ? 's' : ''} selected</p>
                    </div>
                </div>
            )}
        </div>
      )}

      <Table isBordered isStriped isHoverable isFullwidth>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                      <div className="is-flex is-align-items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="icon is-small ml-2">
                            {{
                              asc: '▲',
                              desc: '▼',
                            }[header.column.getIsSorted()] ?? '↕'}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="has-text-centered">
                <p>Loading...</p>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                isSelected={row.getIsSelected()}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="has-text-centered">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enablePagination && table.getRowCount() > pageSize && (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <div className="pagination-previous">
                <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
            </div>
            <div className="pagination-next">
                <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next page
                </Button>
            </div>
            <ul className="pagination-list">
                <li><span className="pagination-ellipsis">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span></li>
            </ul>
            <div className="field is-grouped is-grouped-right">
                <div className="control">
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <p className="control">
                    Rows per page
                </p>
            </div>
        </nav>
      )}
    </div>
  );
};

export default DataTable;
