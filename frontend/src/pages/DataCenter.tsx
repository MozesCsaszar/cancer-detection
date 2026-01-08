import React, { useContext } from "react";
import { DataTable } from "../features/DataTable";
import { DataContext } from "../model/contexts";

export const DataCenter: React.FC = () => {
  const data = useContext(DataContext);

  return <DataTable data={data} />;
};
