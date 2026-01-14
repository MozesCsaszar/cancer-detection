import Papa from "papaparse";
import { type DataEntry } from "../domain/entries";
import { shuffle, chunk } from "lodash";

let nrEntries = 25;

class API {
  async getData(): Promise<[DataEntry[], string]> {
    return new Promise((resolve, _) =>
      Papa.parse<DataEntry>("/OurDataClean.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transform: (value) => value || "None",
        complete: (results) => {
          if (Math.random() < 1) {
            nrEntries++;
          }

          const shuffledData = shuffle(chunk(results.data, 2));

          resolve([
            shuffledData
              .splice(0, Math.min(nrEntries, shuffledData.length - 1))
              .flat(),
            "",
          ]);
        },
        error: (err) => {
          resolve([[], err.message]);
        },
      })
    );
  }
}

export default new API();
