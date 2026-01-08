import { type FC } from "react";
import type { DataEntry } from "../model/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryHistogram,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import type {
  DETargetType,
  DashboardTargetVariableType,
} from "../model/dashboard";
import { startCase } from "lodash";

type DashboardHistogramProps = {
  data: DataEntry[];
  target: DETargetType;
  targetVariable: DashboardTargetVariableType;
};

const DashboardHistogram: FC<DashboardHistogramProps> = ({
  data,
  target = "B2M",
  targetVariable,
}) => {
  const varName = `${target} ${startCase(targetVariable)}`;

  return (
    <VictoryChart theme={VictoryTheme.clean}>
      <VictoryLabel
        text={`Frequency of ${varName} Values`}
        x={100}
        y={45}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis
        label={`${varName} Values`}
        axisLabelComponent={<VictoryLabel dy={-8}></VictoryLabel>}
      ></VictoryAxis>
      {/* Y Axis */}
      <VictoryAxis
        dependentAxis
        label={`Number of Occurrences`}
        axisLabelComponent={<VictoryLabel dx={0}></VictoryLabel>}
      ></VictoryAxis>
      <VictoryHistogram
        data={data
          .filter((row) => row.target === target)
          .map((row) => ({ x: row[targetVariable] }))}
      ></VictoryHistogram>
    </VictoryChart>
  );
};

export default DashboardHistogram;
