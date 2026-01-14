import { Button, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { predictWithNN, type TrainModelResult } from "../../domain/aiModel";
import { startCase } from "lodash";
import DropdownInput from "../components/DropdownInput";
import NumericInput from "../components/NumericInput";

interface PredictionPanelProps {
  isModelTraining: boolean;
  trainingResult: TrainModelResult | null;
}

type InputValueType =
  | {
      type: "numerical";
      min: number;
      max: number;
      value: number;
    }
  | {
      type: "categorical";
      mappings: string[];
      value: string;
    };
const PredictionPanel: FC<PredictionPanelProps> = ({
  isModelTraining,
  trainingResult,
}) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const [inputValues, setInputValues] = useState<{
    [key: string]: InputValueType;
  }>(
    Object.fromEntries(
      Array.from(trainingResult?.mappings.entries() || []).map(
        ([key, mapping]) => {
          if (mapping.type === "categorical") {
            const value =
              mapping.mappings[
                Math.floor(Math.random() * mapping.mappings.length)
              ];
            return [key, { ...mapping, value }];
          }

          const value =
            Math.round(
              (mapping.min + Math.random() * (mapping.max - mapping.min)) * 100
            ) / 100;

          return [
            key,
            {
              ...mapping,
              value,
            },
          ];
        }
      )
    )
  );

  if (isModelTraining) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Please wait while the model is being trained...
      </Typography>
    );
  }

  if (!trainingResult) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Please train a model to make predictions.
      </Typography>
    );
  }

  function predict() {
    if (trainingResult) {
      setIsPredicting(true);

      predictWithNN(
        Object.fromEntries(
          Object.entries(inputValues).map(([key, value]) => [
            key,
            String(value.value),
          ])
        ),
        trainingResult
      ).then((value) => {
        setPrediction(value);
        setIsPredicting(false);
      });
    }
  }

  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 0,
        padding: "1rem",
        justifyContent: "space-between",
        alignSelf: "stretch",
      }}
    >
      <Stack sx={{ gap: "0.5rem" }}>
        <Typography
          sx={{ textAlign: "center", marginBottom: "0.5rem" }}
          variant="h5"
        >
          Input Variables
        </Typography>
        {Object.entries(inputValues).map(([key, mapping]) =>
          mapping.type === "categorical" ? (
            <DropdownInput
              value={mapping.value}
              setValue={(value) => {
                setInputValues((prev) => ({
                  ...prev,
                  [key]: { ...mapping, value },
                }));
              }}
              values={mapping.mappings}
              label={key}
              key={key}
              useStartCase={key !== "target"}
            ></DropdownInput>
          ) : (
            <NumericInput
              value={mapping.value}
              setValue={(value) => {
                setInputValues((prev) => ({
                  ...prev,
                  [key]: { ...mapping, value },
                }));
              }}
              label={key}
              key={key}
            ></NumericInput>
          )
        )}
      </Stack>
      <Stack>
        <Typography
          sx={{ textAlign: "center", marginBottom: "1rem" }}
          variant="h5"
        >
          Prediction Result
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          {prediction
            ? `${startCase(trainingResult.target)}: ${prediction}`
            : "Please make a prediction..."}
        </Typography>
      </Stack>
      <Button variant="contained" onClick={() => predict()}>
        {isPredicting ? "Predicting..." : "Predict"}
      </Button>
    </Stack>
  );
};

export default PredictionPanel;
