import React, { useContext } from "react";
import { DataTable } from "../features/DataTable";
import { DataContext } from "../domain/contexts";

export const DataCenter: React.FC = () => {
  const data = useContext(DataContext);

  return <DataTable data={data} />;
};
