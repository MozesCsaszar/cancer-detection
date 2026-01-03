// src/hooks/useCsvData.ts
import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  DashboardTargetType,
  DashboardTargetVariableType,
} from "../model/dashboard";

export function useSelectTarget(
  defaultTarget: DashboardTargetType = "B2M"
): [
  DashboardTargetType,
  Dispatch<SetStateAction<DashboardTargetType>>,
  DashboardTargetVariableType,
  Dispatch<SetStateAction<DashboardTargetVariableType>>
] {
  const [target, setTarget] = useState<DashboardTargetType>(defaultTarget);
  const [targetVariable, setTargetVariable] =
    useState<DashboardTargetVariableType>("concentration");

  return [target, setTarget, targetVariable, setTargetVariable];
}
