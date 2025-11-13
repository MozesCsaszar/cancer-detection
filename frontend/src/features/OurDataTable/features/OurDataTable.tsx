// src/components/DataTable.tsx
import React, { useMemo, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
  TableSortLabel,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { type CsvRow } from "../../../hooks/useCsvData";
import { startCase } from "lodash";

interface OurDataTableProps {
  data: CsvRow[];
}

export const OurDataTable: React.FC<OurDataTableProps> = ({ data }) => {
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Columns (dynamic)
  const columns = useMemo<ColumnDef<CsvRow>[]>(
    () =>
      Object.keys(data[0]).map((key) => ({
        accessorKey: key,
        header: startCase(key),
      })),
    [data]
  );

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Handle pagination
  const paginatedRows = table
    .getRowModel()
    .rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                      paddingX: "0.5rem",
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <TableSortLabel
                        active={header.column.getIsSorted() !== false}
                        direction={
                          header.column.getIsSorted() === "desc"
                            ? "desc"
                            : "asc"
                        }
                        sx={{ color: "white", marginLeft: "1.5rem" }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      backgroundColor:
                        rowIndex % 2 === 0
                          ? "action.hover"
                          : "background.paper",
                      textAlign: "center",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={table.getRowModel().rows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 15, 25, 50]}
      />
    </Paper>
  );
};
