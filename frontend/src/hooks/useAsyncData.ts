import { useEffect, useState } from "react";
import { type DataEntry } from "../domain/entries";
import API from "../api/csvAPI";

function doesDataMatch(oldData: DataEntry[], newData: DataEntry[]) {
  if (oldData.length === 0) {
    return newData.length === 0;
  }

  const oldDataIDs = new Set(oldData.map((entry) => entry.ID));
  const newDataIDs = new Set(newData.map((entry) => entry.ID));
  return (
    oldDataIDs.size === newDataIDs.size &&
    Array.from(oldDataIDs).filter((id) => !newDataIDs.has(id)).length === 0
  );
}

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
            const dataMatches = doesDataMatch(data, respData);
            console.log(dataMatches, data.length, respData.length);
            if (!dataMatches) {
              setData(respData);
            }
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
