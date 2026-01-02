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
import { startCase } from "lodash";
import type { DataEntry } from "../../model/entries";

interface OurDataTableProps {
  data: DataEntry[];
}

export const OurDataTable: React.FC<OurDataTableProps> = ({ data }) => {
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  console.log("HER3");

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

  console.log("HER2");

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log("HER1");

  // Handle pagination
  const paginatedRows = table
    .getRowModel()
    .rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log("HER");

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <TableContainer sx={{ maxHeight: "100vh" }}>
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
                          header.column.getIsSorted() === "desc"
                            ? "desc"
                            : "asc"
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
                {row.getVisibleCells().map((cell, cellIndex) => {
                  return cellIndex < 3 && rowIndex % 2 === 1 ? null : (
                    <TableCell
                      key={cell.id}
                      rowSpan={cellIndex < 3 ? 2 : 1}
                      sx={{
                        backgroundColor:
                          rowIndex % 2 === 1
                            ? "action.hover"
                            : "background.paper",
                        textAlign: "center",
                        paddingX: "0",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignContent: "center",
            marginRight: "2rem",
            gap: "2rem",
            position: "sticky",
            bottom: "0",
            backgroundColor: "white",
          }}
        >
          <TablePagination
            component="div"
            count={table.getRowModel().rows.length / 2}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage / 2}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10) * 2);
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 15, 25]}
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
        </div>
      </TableContainer>
    </Paper>
  );
};
