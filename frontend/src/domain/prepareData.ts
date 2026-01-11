import { shuffle } from "lodash";
import type { DEAllFieldsType } from "../features/AICenter/TrainingInputPanel";
import {
  deCategoricalVariables,
  type DataEntry,
  type DECategoricalVariablesType,
  type DENumericalVariablesType,
} from "./entries";

function createOneHotArray(index: number, size: number): number[] {
  return Array.from({ length: size }, (_, i) => (i === index ? 1 : 0));
}

function oneHotEncode(
  data: DataEntry[],
  field: DECategoricalVariablesType
): { values: number[][]; mapping: string[] } {
  const categoryValues = getPossibleValues(data, field);
  const values = data
    .map((entry) => entry[field])
    .map((entry) => categoryValues.indexOf(entry));
  return {
    values: values.map((entry) =>
      createOneHotArray(entry, categoryValues.length)
    ),
    mapping: categoryValues,
  };
}

function getPossibleValues(
  data: DataEntry[],
  field: DECategoricalVariablesType
): string[] {
  return new Array(...new Set(data.map((entry) => entry[field])));
}

export function splitData(data: any[], validationProportion: number) {
  return {
    train: data.slice(0, Math.floor(data.length * validationProportion)),
    validation: data.slice(Math.floor(data.length * validationProportion)),
  };
}

function normalize(
  data: DataEntry[],
  field: DENumericalVariablesType,
  validationProportion: number
): { values: number[]; min: number; max: number } {
  const values = data.map((entry) => entry[field]);

  const { train } = splitData(values, validationProportion);

  const min = Math.min(...train);
  const max = Math.max(...train);

  if (max === min) {
    return { values: values.map(() => 0), min, max };
  }

  return { values: values.map((v) => (v - min) / (max - min)), min, max };
}

export type PreparedFieldType =
  | {
      values: number[];
      type: "numerical";
    }
  | {
      values: number[][];
      type: "categorical";
      mapping: string[];
    };

function prepareField(
  data: DataEntry[],
  fieldName: DEAllFieldsType,
  validationProportion: number
): PreparedFieldType {
  if ((deCategoricalVariables as unknown as string[]).includes(fieldName)) {
    return {
      ...oneHotEncode(data, fieldName as DECategoricalVariablesType),
      type: "categorical",
    };
  } else {
    return {
      ...normalize(
        data,
        fieldName as DENumericalVariablesType,
        validationProportion
      ),
      type: "numerical",
    };
  }
}

function prepareTargetField(
  data: DataEntry[],
  fieldName: DEAllFieldsType,
  validationProportion: number
): PreparedFieldType {
  if ((deCategoricalVariables as unknown as string[]).includes(fieldName)) {
    const categories = getPossibleValues(
      data,
      fieldName as DECategoricalVariablesType
    );

    return {
      type: "categorical",
      mapping: categories,
      values:
        categories.length > 2
          ? oneHotEncode(data, fieldName as DECategoricalVariablesType).values
          : // binary classification case
            data.map((entry) => [
              categories.indexOf(entry[fieldName] as string),
            ]),
    };
  } else {
    return prepareField(data, fieldName, validationProportion);
  }
}

export type PreparedDataType = {
  featureFields: Map<string, PreparedFieldType>;
  targetField: PreparedFieldType;
  validationProportion: number;
};

export function prepareData(
  data: DataEntry[],
  featureFields: DEAllFieldsType[],
  targetField: DEAllFieldsType,
  validationProportion: number = 0.2
): PreparedDataType {
  // prepare the data
  const preparedData = new Map<string, PreparedFieldType>();

  // TODO: Shuffle data
  const dataCopy = data.map((entry) => ({ ...entry }));
  const shuffledData = shuffle(dataCopy);

  for (const field of featureFields) {
    preparedData.set(
      field,
      prepareField(shuffledData, field, validationProportion)
    );
  }
  // format it in the correct mode
  return {
    featureFields: preparedData,
    targetField: prepareTargetField(
      shuffledData,
      targetField,
      validationProportion
    ),
    validationProportion,
  };
}
