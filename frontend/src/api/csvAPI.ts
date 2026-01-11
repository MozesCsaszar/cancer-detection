import Papa from "papaparse";
import { type DataEntry } from "../domain/entries";

class API {
  async getData(): Promise<[DataEntry[], string]> {
    return new Promise((resolve, _) =>
      Papa.parse<DataEntry>("/OurDataClean.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          resolve([results.data, ""]);
        },
        error: (err) => {
          resolve([[], err.message]);
        },
      })
    );
  }
}

export default new API();
