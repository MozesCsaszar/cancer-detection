import Papa from "papaparse";
import { type DataEntry } from "../domain/entries";
import { shuffle, chunk } from "lodash";

let nrEntries = 50;
let data: DataEntry[] = [];

class API {
  async getData(): Promise<[DataEntry[], string]> {
    return new Promise((resolve, _) =>
      Papa.parse<DataEntry>("/OurDataClean.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (data.length === 0) {
            data = shuffle(chunk(results.data, 2)).flat();
          }

          if (Math.random() < 1) {
            nrEntries += 2;
          }

          console.log(data.slice(0, Math.min(nrEntries, data.length - 2)));

          resolve([data.slice(0, Math.min(nrEntries, data.length - 2)), ""]);
        },
        error: (err) => {
          resolve([[], err.message]);
        },
      })
    );
  }
}

export default new API();
