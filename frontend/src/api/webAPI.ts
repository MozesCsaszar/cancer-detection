import {
  type DataEntry,
  type DESampleType,
  type DEStageType,
  type DETargetType,
} from "../domain/entries";
import axios from "axios";

type ResponseDataEntry = {
  CI_95: string;
  Concentration_copies_uL: number;
  Control_type: string;
  EventEnqueuedUtcTime: string;
  EventProcessedUtcTime: string;
  IC: string;
  Name: string;
  PartitionId: string;
  Partitions_negative: string;
  Partitions_positive: string;
  Partitions_valid: string;
  Reaction_Mix: string;
  Sample: string;
  Target: "string";
  Threshold: number;
  ingestion_ts: string;
  run_date: string;
};

class API {
  async getData(): Promise<[DataEntry[], string]> {
    return new Promise((resolve, _) => {
      axios
        .get<ResponseDataEntry[]>(
          "https://pcr-machine-reading-api-erecdybmfrdfhmhy.westeurope-01.azurewebsites.net/api/pcr-readings",
          {}
        )
        .then((resp) =>
          resolve([
            resp.data.map((entry, index) => ({
              index: index,
              ID: Number(entry.Sample),
              sampleType: entry.Control_type as DESampleType,
              stage: entry.IC as DEStageType,
              target: entry.Target as DETargetType,
              concentration: entry.Concentration_copies_uL,
              CI:
                Number(entry.CI_95.substring(1, entry.CI_95.length - 1)) / 100,
              partitionsValid: Number(entry.Partitions_valid),
              partitionsPositive: Number(entry.Partitions_positive),
              partitionsNegative: Number(entry.Partitions_negative),
              threshold: entry.Threshold,
            })),
            "",
          ])
        )
        .catch((err) => resolve([[], err.message]));
    });
  }
}

export default new API();
