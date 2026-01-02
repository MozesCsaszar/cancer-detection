// src/hooks/useCsvData.ts
import { useEffect, useState } from "react";
import { type DataEntry } from "../model/entries";
import API from "../api/entries";

export function useAsyncData() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    API.getData()
      .then(([data, error]) => {
        if (error === "") {
          setData(data);
        } else {
          setError(error);
        }
        setLoading(false);
      })
      // Catch the unknown error and console log it
      .catch((error) => {
        const errorMsg = `Unknown error: ${error}`;
        console.error(errorMsg);
        setError(errorMsg);
      });
  }, []);

  return { data, loading, error };
}
