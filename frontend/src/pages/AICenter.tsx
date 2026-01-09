import React, { useCallback, useContext, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DataContext } from "../model/contexts";
import TrainingInputPanel, {
  allFields,
  type FeatureFieldsType,
  type TrainingParamtersType,
} from "../features/AICenter/TrainingInputPanel";

export const AICenter: React.FC = () => {
  const [targetField, setTargetField] = useState(allFields[0]);

  const [fields, setFields] = useState<FeatureFieldsType>(
    Object.fromEntries(
      // take out the target field from selections
      allFields.map((field) => [
        field,
        {
          name: field,
          isUsed: true,
        },
      ])
    )
  );

  const [isModelTrained, setIsModelTrained] = useState(false);
  const [isModelTraining, setIsModelTraining] = useState(false);

  const [hiddenLayers, setHiddenLayers] = useState<number[]>([10]);
  const [trainingParameters, setTrainingParamters] =
    useState<TrainingParamtersType>({
      numberOfEpochs: { draft: 10, value: 10 },
    });

  const data = useContext(DataContext);

  const trainModel = useCallback(() => {
    setIsModelTraining(true);

    console.log(trainingParameters);
    console.log(hiddenLayers);
    console.log(targetField);
    console.log(fields);

    // PLACEHOLDER FOR MODEL TRAINING
    setTimeout(() => {
      setIsModelTraining(false);
      setIsModelTrained(true);
    }, 1000);
  }, [data, trainingParameters, hiddenLayers, targetField, fields]);

  return (
    <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
      {/* Train Panel */}
      <TrainingInputPanel
        fields={fields}
        setFields={setFields}
        targetField={targetField}
        setTargetField={setTargetField}
        trainModel={trainModel}
        isModelTraining={isModelTraining}
        hiddenLayers={hiddenLayers}
        setHiddenLayers={setHiddenLayers}
        trainingParameters={trainingParameters}
        setTrainingParameters={setTrainingParamters}
      ></TrainingInputPanel>
      {/* Statistics */}
      <Stack sx={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        {isModelTraining ? (
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Please wait while the model is being trained...
          </Typography>
        ) : isModelTrained ? (
          <>Statistics</>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="h5"
          >
            Please train a model to see training statistics.
          </Typography>
        )}
      </Stack>
      {/* Predict */}
      <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isModelTraining ? (
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Please wait while the model is being trained...
          </Typography>
        ) : isModelTrained ? (
          <>Prediction</>
        ) : (
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Please train a model to make predictions.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
