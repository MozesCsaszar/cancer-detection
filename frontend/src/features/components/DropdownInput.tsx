import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { startCase } from "lodash";
import { type FC } from "react";

interface DropdownInputProps {
  value: string;
  setValue: (value: string) => void;
  values: readonly string[];
  label: string;
  required?: boolean;
  useStartCase?: boolean;
}

const DropdownInput: FC<DropdownInputProps> = ({
  value,
  setValue,
  label,
  values,
  required = false,
  useStartCase = true,
}) => {
  return (
    <FormControl>
      <InputLabel id={`${label}-label`}>{startCase(label)}</InputLabel>
      <Select
        labelId={`${label}-label`}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        required={required}
        label={`${startCase(label)}`}
      >
        {values.map((variable) => {
          const name = useStartCase ? startCase(variable) : variable;
          return (
            <MenuItem key={variable} value={variable}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DropdownInput;
