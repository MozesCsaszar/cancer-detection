import { createContext, type Dispatch, type SetStateAction } from "react";
import { type DataEntry } from "./entries";
import {
  initStatistics,
  type TrainingStatistics,
  type TrainModelResult,
} from "./aiModel";

export const DataContext = createContext<DataEntry[]>([]);

export const TrainModelResultContext = createContext<{
  trainingResult: TrainModelResult | null;
  statistics: TrainingStatistics;
  setTrainingResult: ((result: TrainModelResult) => void) | null;
  setStatistics: Dispatch<SetStateAction<TrainingStatistics>> | null;
}>({
  trainingResult: null,
  statistics: initStatistics("categorical"),
  setTrainingResult: null,
  setStatistics: null,
});
