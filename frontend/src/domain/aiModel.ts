import type { DEAllFieldsType } from "../features/AICenter/TrainingInputPanel";
import * as tf from "@tensorflow/tfjs";
import {
  prepareData,
  splitData,
  type PreparedDataType,
  type PreparedFieldType,
} from "./prepareData";
import type { DataEntry } from "./entries";
import { sum } from "lodash";
import type { Dispatch, SetStateAction } from "react";

export type TrainingConfiguration = {
  nrEpochs: number;
  validationProportion: number;
  learningRate: number;
  hiddenLayers: number[];
  featureFields: DEAllFieldsType[];
  targetField: DEAllFieldsType;
};

function r2(yTrue: tf.Tensor, yPred: tf.Tensor) {
  const ssRes = tf.sum(tf.square(tf.sub(yTrue, yPred)));
  const mean = tf.mean(yTrue);
  const ssTot = tf.sum(tf.square(tf.sub(yTrue, mean)));
  return tf.sub(1, tf.div(ssRes, ssTot));
}

function createModel(
  config: TrainingConfiguration,
  nrInputs: number,
  nrOutputs: number
) {
  // create layers
  const layers = [
    tf.layers.dense({
      inputShape: [nrInputs],
      kernelInitializer: "glorotUniform",
      biasInitializer: "zeros",
      // units: config.hiddenLayers[0],
      units: config.hiddenLayers[0],
      activation: "tanh",
    }),
  ];

  // Additional hidden layers
  for (let i = 1; i < config.hiddenLayers.length; i++) {
    layers.push(
      tf.layers.dense({
        units: config.hiddenLayers[i],
        activation: "relu",
      })
    );
  }

  const activation =
    nrOutputs === 1 ? "linear" : nrOutputs === 2 ? "sigmoid" : "softmax";

  // output layer
  layers.push(
    tf.layers.dense({
      // binary classification
      kernelInitializer: "glorotUniform",
      biasInitializer: "zeros",
      units: nrOutputs === 2 ? 1 : nrOutputs,
      activation,
    })
  );

  // create model
  const model = tf.sequential({ layers });

  const loss =
    nrOutputs === 1
      ? "meanSquaredError"
      : nrOutputs === 2
      ? "binaryCrossentropy"
      : "categoricalCrossentropy";

  // const metrics = nrOutputs === 1 ? ["r2"] : ["accuracy"];
  const metrics = nrOutputs === 1 ? [r2] : ["accuracy"];

  model.compile({
    optimizer: tf.train.adam(config.learningRate),
    loss,
    metrics,
  });

  console.log("CONFIG", config, nrInputs, nrOutputs, activation, loss, metrics);
  console.log(model);

  return model;
}

function calculateFieldSize(field: PreparedFieldType): number {
  return field.type === "numerical" ? 1 : field.mapping.length;
}

function calculateInputSize(featureFields: PreparedFieldType[]): number {
  return sum(featureFields.map(calculateFieldSize));
}

function extractCategoricalMappings(
  preparedData: PreparedDataType,
  targetField: DEAllFieldsType
) {
  const mappings = new Map<string, string[]>();
  Array.from(preparedData.featureFields.keys()).forEach((key) => {
    const featureField = preparedData.featureFields.get(key)!;
    if (featureField.type === "categorical") {
      mappings.set(key, featureField.mapping);
    }
  });

  if (preparedData.targetField.type === "categorical") {
    mappings.set(targetField, preparedData.targetField.mapping);
  }

  return mappings;
}

export type TrainModelResult = {
  model: tf.Sequential;
  inputSize: number;
  outputSize: number;
  mappings: Map<string, string[]>;
};

export type TrainingStatistics =
  | {
      loss: number[];
      valLoss: number[];
    } & (
      | { type: "categorical"; acc: number[]; valAcc: number[] }
      | { type: "numerical"; r2: number[]; valR2: number[] }
    );

export function initStatistics(
  type: "categorical" | "numerical"
): TrainingStatistics {
  if (type === "categorical") {
    return {
      type,
      loss: [],
      valLoss: [],
      acc: [],
      valAcc: [],
    };
  } else {
    return {
      type,
      loss: [],
      valLoss: [],
      r2: [],
      valR2: [],
    };
  }
}

function createStatistics(
  prev: TrainingStatistics,
  logs: tf.Logs
): TrainingStatistics {
  if (prev.type === "categorical") {
    return {
      type: prev.type,
      loss: [...prev.loss, logs.loss],
      valLoss: [...prev.valLoss, logs.val_loss ?? 0],
      acc: [...prev.acc, logs.acc],
      valAcc: [...prev.valAcc, logs.val_acc],
    };
  } else {
    return {
      type: prev.type,
      loss: [...prev.loss, logs.loss],
      valLoss: [...prev.valLoss, logs.val_loss ?? 0],
      r2: [...prev.r2, logs.r2],
      valR2: [...prev.valR2, logs.val_r2],
    };
  }
}

export function trainNNModel(
  data: DataEntry[],
  config: TrainingConfiguration,
  setTrainingStatistics: Dispatch<SetStateAction<TrainingStatistics>>
): Promise<TrainModelResult> {
  // prepare the data
  const preparedData = prepareData(
    data,
    config.featureFields,
    config.targetField,
    config.validationProportion
  );

  // create data tensors from features and target
  const vectorFeaturesData: number[][] = Array.from(
    { length: data.length },
    () => []
  );
  preparedData.featureFields.forEach((preparedField) => {
    for (let i = 0; i < preparedField.values.length; i++) {
      if (preparedField.type === "categorical") {
        vectorFeaturesData[i].push(...preparedField.values[i]);
      } else {
        vectorFeaturesData[i].push(preparedField.values[i]);
      }
    }
  });

  const vectorTargetData: number[][] = preparedData.targetField.values.map(
    (value) => (typeof value === "number" ? [value] : value)
  );

  const inputSize = calculateInputSize(
    Array.from(preparedData.featureFields.values())
  );
  const outputSize = calculateFieldSize(preparedData.targetField);

  // create the AI model
  const model = createModel(config, inputSize, outputSize);

  const { train: xs, validation: xsVal } = splitData(
    vectorFeaturesData,
    preparedData.validationProportion
  );
  const { train: ys, validation: ysVal } = splitData(
    vectorTargetData,
    preparedData.validationProportion
  );

  return new Promise<TrainModelResult>((resolve, _) => {
    model
      .fit(tf.tensor2d(xs), tf.tensor2d(ys), {
        epochs: config.nrEpochs,
        batchSize: 16,
        validationData: [tf.tensor2d(xsVal), tf.tensor2d(ysVal)],
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            if (!logs) return;
            setTrainingStatistics((prev) => {
              const obj = createStatistics(prev, logs);
              if (epoch === config.nrEpochs - 1) {
                console.log(obj);
              }
              return obj;
            });
          },
        },
      })
      .then(() =>
        resolve({
          model,
          inputSize,
          outputSize,
          mappings: extractCategoricalMappings(
            preparedData,
            config.targetField
          ),
        })
      );
  });
}
