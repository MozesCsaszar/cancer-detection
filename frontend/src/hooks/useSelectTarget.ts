// src/hooks/useCsvData.ts
import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  DETargetType,
  DENumericalVariablesType,
} from "../model/dashboard";

export function useSelectTarget(
  defaultTarget: DETargetType = "B2M"
): [
  DETargetType,
  Dispatch<SetStateAction<DETargetType>>,
  DENumericalVariablesType,
  Dispatch<SetStateAction<DENumericalVariablesType>>
] {
  const [target, setTarget] = useState<DETargetType>(defaultTarget);
  const [targetVariable, setTargetVariable] =
    useState<DENumericalVariablesType>("concentration");

  return [target, setTarget, targetVariable, setTargetVariable];
}
