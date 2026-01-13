import { Typography } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface PredictionPanelProps {
  isModelTraining: boolean;
  isModelTrained: boolean;
}

const PredictionPanel: FC<PredictionPanelProps> = ({
  isModelTrained,
  isModelTraining,
}) => {
  if (!isModelTrained && !isModelTraining) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Please train a model to make predictions.
      </Typography>
    );
  }

  if (isModelTraining) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Please wait while the model is being trained...
      </Typography>
    );
  }

  return <></>;
};

export default PredictionPanel;
