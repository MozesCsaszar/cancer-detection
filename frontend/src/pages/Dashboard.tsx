import React from "react";
import { DataTable } from "../features/DataTable";
import { useData } from "../hooks/useCsvData";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useData();
  if (loading) return <p>Loading...</p>;
  if (error !== "") return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <DataTable data={data} />
    </div>
  );
};
