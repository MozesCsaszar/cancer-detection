import type { DashboardTargetType } from "./dashboard";

export type DataEntry = {
  index: number;
  ID: number;
  sampleType: string;
  stage: string;
  target: DashboardTargetType;
  concentration: number;
  CI: number;
  partitionsValid: number;
  partitionsPositive: number;
  partitionsNegative: number;
  threshold: number;
};
