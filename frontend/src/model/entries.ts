export type DESampleType = "Patient" | "Control";
export type DEStageType = "Early" | "Late" | "";
// TODO: Maybe change this
export type DETargetType = "B2M" | "TP53" | "PVT1";

export type DataEntry = {
  index: number;
  ID: number;
  sampleType: DESampleType;
  stage: DEStageType;
  target: DETargetType;
  concentration: number;
  CI: number;
  partitionsValid: number;
  partitionsPositive: number;
  partitionsNegative: number;
  threshold: number;
};
