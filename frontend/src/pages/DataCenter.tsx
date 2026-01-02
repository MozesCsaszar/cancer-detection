import React from "react";
import { DataTable } from "../features/DataTable";
import { useAsyncData } from "../hooks/useAsyncData";
import { Box } from "@mui/material";

export const DataCenter: React.FC = () => {
  const { data, loading, error } = useAsyncData();
  if (loading) return <p>Loading...</p>;
  if (error !== "") return <p>Error: {error}</p>;

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100%",
      }}
    >
      <DataTable data={data} />
    </Box>
  );
};
