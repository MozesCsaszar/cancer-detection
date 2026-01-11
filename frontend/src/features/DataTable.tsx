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
  Pagination,
  TableSortLabel,
  Box,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { startCase } from "lodash";
import type { DataEntry } from "../domain/entries";

interface DataTableProps {
  data: DataEntry[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ID", desc: false },
  ]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Columns (dynamic)
  const columns = useMemo<ColumnDef<DataEntry>[]>(
    () =>
      Object.keys(data[0])
        .map((key) => ({
          accessorKey: key,
          header: startCase(key),
        }))
        .slice(1),
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
    <TableContainer sx={{ flex: 1, maxHeight: "100%" }}>
      <Table stickyHeader>
        <TableHead sx={{ position: "sticky", top: "0" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold",
                    paddingX: "0",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <TableSortLabel
                      active={header.column.getIsSorted() !== false}
                      direction={
                        header.column.getIsSorted() === "desc" ? "desc" : "asc"
                      }
                      sx={{
                        color: "white",
                        marginLeft: "1.5rem",
                      }}
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
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    sx={{
                      backgroundColor:
                        rowIndex % 2 === 1
                          ? "action.hover"
                          : "background.paper",
                      textAlign: "center",
                      paddingX: "0",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: "2rem",
          position: "sticky",
          bottom: "0",
          backgroundColor: "white",
        }}
      >
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
          rowsPerPageOptions={[10, 20, 30, 50]}
          backIconButtonProps={{ style: { display: "none" } }}
          nextIconButtonProps={{ style: { display: "none" } }}
        />

        <Pagination
          sx={{ display: "flex", alignContent: "center" }}
          count={totalPages}
          page={page + 1}
          onChange={(_, value) => setPage(value - 1)}
          color="primary"
        />
      </Box>
    </TableContainer>
  );
};
