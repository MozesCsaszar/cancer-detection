import { useEffect, useState } from "react";
import { type DataEntry } from "../domain/entries";
import API from "../api/csvAPI";

export function useAsyncData() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length === 0) {
        setLoading(true);
      }

      API.getData()
        .then(([respData, error]) => {
          if (error === "") {
            setData(respData);
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
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return { data, loading, error };
}
