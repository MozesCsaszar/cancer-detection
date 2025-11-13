// src/hooks/useCsvData.ts
import { useEffect, useState } from "react";
import Papa from "papaparse";

export interface CsvRow {
  index: number;
  ID: number;
  sampleType: string;
  stage: string;
  target: string;
  concentration: number;
  CI: number;
  partitionsValid: number;
  partitionsPositive: number;
  partitionsNegative: number;
  threshold: number;
}

export function useCsvData(filePath: string) {
  const [data, setData] = useState<CsvRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Papa.parse<CsvRow>(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  }, [filePath]);

  return { data, loading, error };
}
