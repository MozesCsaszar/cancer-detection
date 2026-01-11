import React, { useCallback, useContext, useState } from "react";
import { flushSync } from "react-dom";
import { Box, Stack, Typography } from "@mui/material";
import { DataContext } from "../domain/contexts";
import TrainingInputPanel, {
  allFields,
  type DEAllFieldsType,
  type FeatureFieldsType,
  type TrainingParamtersType,
} from "../features/AICenter/TrainingInputPanel";
import {
  initStatistics,
  trainNNModel,
  type TrainingStatistics,
} from "../domain/aiModel";
import StatisticsLineplot from "../features/AICenter/StatisticsLineplot";
import { deCategoricalVariables } from "../domain/entries";

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
      learningRate: { draft: 1e-4, value: 1e-4 },
      validationProportion: { draft: 0.2, value: 0.2 },
    });

  const data = useContext(DataContext);

  const [statistics, setStatistics] = useState<TrainingStatistics>(
    initStatistics("categorical")
  );

  const trainModel = useCallback(() => {
    flushSync(() => {
      setIsModelTraining(true);

      // set the statistics
      setStatistics(
        initStatistics(
          (deCategoricalVariables as readonly string[]).includes(targetField)
            ? "categorical"
            : "numerical"
        )
      );
    });

    trainNNModel(
      data,
      {
        // training parameters
        nrEpochs: trainingParameters.numberOfEpochs.value,
        validationProportion: trainingParameters.validationProportion.value,
        learningRate: trainingParameters.learningRate.value,
        // layers
        hiddenLayers,
        // fields
        featureFields: Object.entries(fields)
          .filter(([key, value]) => value.isUsed && key !== targetField)
          .map(([key, _]) => key) as DEAllFieldsType[],
        targetField,
      },
      setStatistics
    ).then((res) => {
      setIsModelTraining(false);
      setIsModelTrained(true);
    });
  }, [data, trainingParameters, hiddenLayers, targetField, fields, statistics]);

  const statisticsParams = {
    metric: statistics.type === "categorical" ? "Accuracy" : "R-Squared",
    values: statistics.type === "categorical" ? statistics.acc : statistics.r2,
    validationValues:
      statistics.type === "categorical" ? statistics.valAcc : statistics.valR2,
  };

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
      <Stack
        sx={{
          flex: 2,
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
          alignSelf: "center",
          marginTop: "-4vh",
        }}
      >
        {isModelTraining || isModelTrained ? (
          <>
            <Box sx={{ flex: 1 }}>
              <StatisticsLineplot
                metric="Loss"
                values={statistics.loss}
                validationValues={statistics.valLoss}
                clampY={false}
              ></StatisticsLineplot>
            </Box>
            <Box sx={{ flex: 1 }}>
              <StatisticsLineplot
                metric={statisticsParams.metric}
                values={statisticsParams.values}
                validationValues={statisticsParams.validationValues}
                clampY={statistics.type === "numerical"}
              ></StatisticsLineplot>
            </Box>
          </>
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
