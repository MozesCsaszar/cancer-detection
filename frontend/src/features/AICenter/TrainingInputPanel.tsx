import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { startCase } from "lodash";
import { type Dispatch, type FC, type SetStateAction } from "react";
import {
  deCategoricalVariables,
  deNumericalVariables,
} from "../../domain/entries";
import NumericInput from "../components/NumericInput";
import DropdownInput from "../components/DropdownInput";

const MAX_HIDDEN_LAYERS = 3;
const MAX_NUMBER_NEURONS = 100;
const TRAINING_PARAMETER_LIMITS = {
  numberOfEpochs: {
    min: 1,
    max: 1000,
  },
  learningRate: {
    min: 1e-10,
    max: 0.1,
  },
  validationProportion: {
    min: 0.1,
    max: 0.9,
  },
};

export type TrainingParamtersType = {
  [name in keyof typeof TRAINING_PARAMETER_LIMITS]: number;
};

export const allFields = [...deCategoricalVariables, ...deNumericalVariables];

export type DEAllFieldsType = (typeof allFields)[number];

export type FeatureFieldsType = {
  [key in (typeof allFields)[number]]?: { name: string; isUsed: boolean };
};

interface TrainingInputPanelProps {
  targetField: string;
  setTargetField: Dispatch<SetStateAction<DEAllFieldsType>>;
  fields: FeatureFieldsType;
  setFields: Dispatch<SetStateAction<FeatureFieldsType>>;
  trainModel: () => void;
  isModelTraining: boolean;
  hiddenLayers: number[];
  setHiddenLayers: Dispatch<SetStateAction<number[]>>;
  trainingParameters: TrainingParamtersType;
  setTrainingParameters: Dispatch<SetStateAction<TrainingParamtersType>>;
}

const TrainingInputPanel: FC<TrainingInputPanelProps> = ({
  targetField,
  setTargetField,
  fields,
  setFields,
  trainModel,
  isModelTraining,
  hiddenLayers,
  setHiddenLayers,
  trainingParameters,
  setTrainingParameters,
}) => {
  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 0,
        padding: "1rem",
        justifyContent: "space-between",
      }}
    >
      {/* Inputs */}
      <Stack
        sx={{
          padding: "1em",
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          gap: "2rem",
        }}
      >
        {/* Training Variables */}
        <Stack sx={{ gap: "0.5rem" }}>
          <Typography
            sx={{ textAlign: "center", marginBottom: "1rem" }}
            variant="h5"
          >
            Select Training Parameters
          </Typography>

          {Object.entries(TRAINING_PARAMETER_LIMITS).map(
            ([parameterKey, parameterLimits]) => (
              <NumericInput
                value={
                  trainingParameters[
                    parameterKey as keyof TrainingParamtersType
                  ]
                }
                setValue={(value) =>
                  setTrainingParameters((prev) => ({
                    ...prev,
                    [parameterKey]: value,
                  }))
                }
                label={parameterKey}
                min={parameterLimits.min}
                max={parameterLimits.max}
                key={parameterKey}
              ></NumericInput>
            )
          )}
        </Stack>

        {/* Hidden Layers */}
        <Stack sx={{ gap: "0.5rem" }}>
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {/* Add Layer Button */}
            <Button
              sx={{ position: "absolute", left: 0, top: 0 }}
              variant="contained"
              disabled={hiddenLayers.length === 1}
              onClick={() =>
                setHiddenLayers(
                  hiddenLayers.filter((_, i) => i !== hiddenLayers.length - 1)
                )
              }
            >
              -
            </Button>
            <Typography variant="h5"> Hidden Layers</Typography>
            <Button
              sx={{ position: "absolute", right: 0, top: 0 }}
              variant="contained"
              disabled={hiddenLayers.length === MAX_HIDDEN_LAYERS}
              onClick={() => setHiddenLayers([...hiddenLayers, 10])}
            >
              +
            </Button>
          </Box>

          {hiddenLayers.map((nrNeurons, index) => (
            <NumericInput
              value={nrNeurons}
              setValue={(value) =>
                setHiddenLayers(
                  hiddenLayers.map((nrNeurons, j) => {
                    if (j === index) {
                      return value;
                    }
                    return nrNeurons;
                  })
                )
              }
              label={`layer-${index + 1}-number-of-neurons`}
              min={0}
              max={MAX_NUMBER_NEURONS}
              key={`layer-${index + 1}-number-of-neurons`}
            ></NumericInput>
          ))}
        </Stack>

        {/* Target Variable */}
        <Stack>
          <Typography
            sx={{ textAlign: "center", marginBottom: "1rem" }}
            variant="h5"
          >
            Select Target Variable
          </Typography>
          <DropdownInput
            value={targetField}
            setValue={setTargetField as Dispatch<SetStateAction<string>>}
            values={Object.values(fields).map((field) => field.name)}
            label="target-variable"
          ></DropdownInput>
        </Stack>

        {/* Feature Variables */}
        <Stack>
          <Typography
            sx={{ textAlign: "center", marginBottom: "1rem" }}
            variant="h5"
          >
            Select Features to Use
          </Typography>

          {Object.values(fields)
            .filter((field) => field.name != targetField)
            .map(({ name, isUsed }) => (
              <Box
                key={name}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">{startCase(name)}</Typography>
                <Checkbox
                  checked={isUsed}
                  onChange={() =>
                    setFields({
                      ...fields,
                      [name]: { name, isUsed: !isUsed },
                    })
                  }
                ></Checkbox>
              </Box>
            ))}
        </Stack>
      </Stack>

      {/* Train Button */}
      <Button
        variant="contained"
        onClick={() => !isModelTraining && trainModel()}
      >
        {isModelTraining ? "Training..." : "Train"}
      </Button>
    </Stack>
  );
};

export default TrainingInputPanel;
