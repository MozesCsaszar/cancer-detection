import React from "react";
import { DataTable } from "../features/DataTable";
import { useAsyncData } from "../hooks/useAsyncData";

export const DataCenter: React.FC = () => {
  const { data, loading, error } = useAsyncData();
  if (loading) return <p>Loading...</p>;
  if (error !== "") return <p>Error: {error}</p>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100%",
      }}
    >
      <DataTable data={data} />
    </div>
  );
};
