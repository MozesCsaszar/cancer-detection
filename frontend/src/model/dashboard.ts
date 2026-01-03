export const dashboardTargetVariables = [
  "concentration",
  "partitionsNegative",
  "partitionsPositive",
  "partitionsValid",
  "threshold",
] as const;

export type DashboardTargetVariableType =
  (typeof dashboardTargetVariables)[number];

export type DashboardTargetType = "B2M" | "TP53";
