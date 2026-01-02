import Papa from "papaparse";
import { type DataEntry } from "../model/entries";

class API {
  async getData(): Promise<[DataEntry[], string]> {
    let data: DataEntry[] = [];
    let error: string = "";
    Papa.parse<DataEntry>("/OurDataClean.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        data = results.data;
      },
      error: (err) => {
        error = err.message;
      },
    });

    return [data, error];
  }
}

export default new API();
