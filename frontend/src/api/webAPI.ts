import {
  type DataEntry,
  type DESampleType,
  type DEStageType,
  type DETargetType,
} from "../domain/entries";
import axios from "axios";

type ResponseDataEntry = {
  // Core data fields
  CI: number;
  ID: string;
  concentration: number;
  index: string;
  partitionsNegative: string;
  partitionsPositive: string;
  partitionsValid: string;
  sampleType: string;
  stage: string;
  target: string;
  threshold: number;
  // Extra fields
  PartitionId: string;
  EventEnqueuedUtcTime: string;
  EventProcessedUtcTime: string;
  ingestion_ts: string;
  run_date: string;
};

class API {
  async getData(): Promise<[DataEntry[], string]> {
    return new Promise((resolve, _) => {
      axios
        .get<ResponseDataEntry[]>(
          "https://pcr-machine-reading-api-erecdybmfrdfhmhy.westeurope-01.azurewebsites.net/api/pcr-readings?limit=1000",
          {}
        )
        .then((resp) =>
          resolve([
            resp.data.map((entry) => ({
              index: Number(entry.index),
              ID: Number(entry.ID),
              sampleType: entry.sampleType as DESampleType,
              stage: (entry.stage === "Healty"
                ? "Healthy"
                : entry.stage) as DEStageType,
              target: entry.target as DETargetType,
              concentration: entry.concentration,
              CI: entry.CI,
              partitionsValid: Number(entry.partitionsValid),
              partitionsPositive: Number(entry.partitionsPositive),
              partitionsNegative: Number(entry.partitionsNegative),
              threshold: entry.threshold,
            })),
            "",
          ])
        )
        .catch((err) => resolve([[], err.message]));
    });
  }
}

export default new API();
