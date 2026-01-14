export type DESampleType = "Patient" | "Control";
export type DEStageType = "Early" | "Late" | "";
export type DETargetType = "B2M" | "TP53";

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

export const deNumericalVariables = [
  "concentration",
  "partitionsNegative",
  "partitionsPositive",
  "partitionsValid",
  "threshold",
] as const;

export type DENumericalVariablesType = (typeof deNumericalVariables)[number];

export const deCategoricalVariables = [
  "sampleType",
  "stage",
  "target",
] as const;

export type DECategoricalVariablesType =
  (typeof deCategoricalVariables)[number];
