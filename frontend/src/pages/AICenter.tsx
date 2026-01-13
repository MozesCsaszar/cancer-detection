import React, { useCallback, useContext, useState } from "react";
import { flushSync } from "react-dom";
import { Box, Stack } from "@mui/material";
import { DataContext } from "../domain/contexts";
import TrainingInputPanel, {
  allFields,
  type DEAllFieldsType,
  type FeatureFieldsType,
  type TrainingParamtersType,
} from "../features/AICenter/TrainingInputPanel";
import {
  initStatistics,
  type TrainModelResult,
  trainNNModel,
  type TrainingStatistics,
} from "../domain/aiModel";
import { deCategoricalVariables } from "../domain/entries";
import StatisticsPanel from "../features/AICenter/StatisticsPanel";
import PredictionPanel from "../features/AICenter/PredictionPanel";

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

  const [isModelTraining, setIsModelTraining] = useState(false);

  const [hiddenLayers, setHiddenLayers] = useState<number[]>([10]);
  const [trainingParameters, setTrainingParameters] =
    useState<TrainingParamtersType>({
      numberOfEpochs: { draft: 10, value: 10 },
      learningRate: { draft: 1e-4, value: 1e-4 },
      validationProportion: { draft: 0.2, value: 0.2 },
    });

  const data = useContext(DataContext);

  const [statistics, setStatistics] = useState<TrainingStatistics>(
    initStatistics("categorical")
  );

  const [trainingResult, setTrainingResult] = useState<TrainModelResult | null>(
    null
  );

  const trainModel = useCallback(async () => {
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
      setTrainingResult(res);
    });
  }, [data, trainingParameters, hiddenLayers, targetField, fields, statistics]);

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
        setTrainingParameters={setTrainingParameters}
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
        <StatisticsPanel
          isModelTrained={!!trainingResult}
          isModelTraining={isModelTraining}
          statistics={statistics}
        ></StatisticsPanel>
      </Stack>
      {/* Predict */}
      <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PredictionPanel
          isModelTrained={!!trainingResult}
          isModelTraining={isModelTraining}
        ></PredictionPanel>
      </Stack>
    </Box>
  );
};
