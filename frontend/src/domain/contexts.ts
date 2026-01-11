import { createContext } from "react";
import { type DataEntry } from "./entries";

export const DataContext = createContext<DataEntry[]>([]);
