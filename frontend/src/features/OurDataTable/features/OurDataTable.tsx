// src/components/DataTable.tsx
import React, { useMemo } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type CsvRow } from "../../../hooks/useCsvData";

interface OurDataTableProps {
  data: CsvRow[];
}

export const OurDataTable: React.FC<OurDataTableProps> = ({ data }) => {
  console.log(data);
  console.log(
    Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
    }))
  );
  try {
    const columns = useMemo<ColumnDef<CsvRow>[]>(
      () =>
        Object.keys(data[0]).map((key) => ({
          accessorKey: key,
          header: key,
        })),
      []
    );

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <table className="border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-2 py-1 bg-gray-100">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch (error) {
    console.log(error);
  }
};
