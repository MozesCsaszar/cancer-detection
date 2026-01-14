import { type Dispatch, type FC, type SetStateAction } from "react";
import { Stack, Typography } from "@mui/material";
import {
  deNumericalVariables,
  type DETargetType,
  type DENumericalVariablesType,
} from "../domain/entries";
import DropdownInput from "./components/DropdownInput";

interface DashboardTargetSelectProps {
  title: string;
  target: DETargetType;
  setTarget: Dispatch<SetStateAction<DETargetType>>;
  targetVariable: DENumericalVariablesType;
  setTargetVariable: Dispatch<SetStateAction<DENumericalVariablesType>>;
}

const DashboardTargetSelect: FC<DashboardTargetSelectProps> = ({
  title,
  target,
  setTarget,
  targetVariable,
  setTargetVariable,
}) => (
  <Stack
    sx={{
      justifyContent: "center",
      gap: "1rem",
    }}
  >
    <Typography sx={{ textAlign: "center" }} variant="h5">
      {title}
    </Typography>
    <Stack sx={{ gap: "0.5rem" }}>
      <DropdownInput
        value={target}
        setValue={setTarget as Dispatch<SetStateAction<string>>}
        values={["B2M", "TP53"]}
        label="target-value"
        useStartCase={false}
      ></DropdownInput>
      <DropdownInput
        value={targetVariable}
        setValue={setTargetVariable as Dispatch<SetStateAction<string>>}
        values={deNumericalVariables as readonly string[]}
        label="target-variable"
      ></DropdownInput>
    </Stack>
  </Stack>
);

export default DashboardTargetSelect;
