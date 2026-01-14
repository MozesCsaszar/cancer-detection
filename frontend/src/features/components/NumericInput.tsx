import TextField from "@mui/material/TextField";
import { startCase } from "lodash";
import { useState, type FC } from "react";

interface NumericInputProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  required?: boolean;
}

const NumericInput: FC<NumericInputProps> = ({
  value,
  setValue,
  label,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  required = false,
}) => {
  const [draft, setDraft] = useState(String(value));
  return (
    <TextField
      required={required}
      label={startCase(label)}
      value={draft}
      onChange={(event) => {
        setDraft(event.target.value);
      }}
      onBlur={() => {
        const draftValue = Number(draft);
        if (draftValue >= min && draftValue <= max) {
          setValue(draftValue);
        } else {
          setDraft(String(value));
        }
      }}
    ></TextField>
  );
};

export default NumericInput;
