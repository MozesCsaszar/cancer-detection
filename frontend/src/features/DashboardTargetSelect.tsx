import { type Dispatch, type FC, type SetStateAction } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { startCase } from "lodash";
import {
  deNumericalVariables,
  type DETargetType,
  type DENumericalVariablesType,
} from "../model/entries";

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
      gap: "3rem",
    }}
  >
    <Typography sx={{ textAlign: "center" }} variant="h5">
      {title}
    </Typography>
    <Stack sx={{ gap: "0.5rem" }}>
      <FormControl>
        <InputLabel id="target-value-label">Target Value</InputLabel>
        <Select
          labelId="target-value-label"
          onChange={(e) => setTarget(e.target.value)}
          value={target}
          label="Target Value"
        >
          <MenuItem value="B2M">B2M</MenuItem>
          <MenuItem value="TP53">TP53</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="target-variable-label">Target Variable</InputLabel>
        <Select
          labelId="target-variable-label"
          onChange={(e) => setTargetVariable(e.target.value)}
          value={targetVariable}
          label="Target Variable"
        >
          {deNumericalVariables.map((variable) => (
            <MenuItem value={variable}>{startCase(variable)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  </Stack>
);

export default DashboardTargetSelect;
