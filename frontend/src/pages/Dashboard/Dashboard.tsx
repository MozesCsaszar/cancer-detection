import React from "react";
import { useCsvData } from "../../hooks/useCsvData";
import { OurDataTable } from "../../features/OurDataTable/features/OurDataTable";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useCsvData("/OurDataClean.csv");
  data.splice(10);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">CSV Data Table</h1>
      <OurDataTable data={data} />
    </div>
  );
};
