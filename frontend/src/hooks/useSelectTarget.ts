// src/hooks/useCsvData.ts
import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  DETargetType,
  DashboardTargetVariableType,
} from "../model/dashboard";

export function useSelectTarget(
  defaultTarget: DETargetType = "B2M"
): [
  DETargetType,
  Dispatch<SetStateAction<DETargetType>>,
  DashboardTargetVariableType,
  Dispatch<SetStateAction<DashboardTargetVariableType>>
] {
  const [target, setTarget] = useState<DETargetType>(defaultTarget);
  const [targetVariable, setTargetVariable] =
    useState<DashboardTargetVariableType>("concentration");

  return [target, setTarget, targetVariable, setTargetVariable];
}
