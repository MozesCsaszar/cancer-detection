import React from "react";
import { DataTable } from "../features/DataTable";
import { useAsyncData } from "../hooks/useAsyncData";
import { Box } from "@mui/material";
import LoadingScreen from "../features/LoadingScreen/LoadingScreen";

export const DataCenter: React.FC = () => {
  const { data, loading, error } = useAsyncData();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <LoadingScreen
        loading={loading}
        error={error}
        createComponent={() => <DataTable data={data} />}
      ></LoadingScreen>
    </Box>
  );
};
