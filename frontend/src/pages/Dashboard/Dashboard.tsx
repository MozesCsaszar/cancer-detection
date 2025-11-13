import React from "react";
import { useCsvData } from "../../hooks/useCsvData";
import { OurDataTable } from "../../features/OurDataTable/features/OurDataTable";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useCsvData("/OurDataClean.csv");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <OurDataTable data={data} />
    </div>
  );
};
