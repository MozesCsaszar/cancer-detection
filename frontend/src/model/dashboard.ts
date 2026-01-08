export const dashboardTargetVariables = [
  "concentration",
  "partitionsNegative",
  "partitionsPositive",
  "partitionsValid",
  "threshold",
] as const;

export type DashboardTargetVariableType =
  (typeof dashboardTargetVariables)[number];
