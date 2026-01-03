import { type FC } from "react";
import type { DataEntry } from "../model/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryHistogram,
  VictoryLabel,
  VictoryAxis,
} from "victory";

type DashboardHistogramProps = {
  data: DataEntry[];
  target?: "B2M" | "TP53";
};

const DashboardHistogram: FC<DashboardHistogramProps> = ({
  data,
  target = "B2M",
}) => {
  return (
    <VictoryChart theme={VictoryTheme.clean}>
      <VictoryLabel
        text={`Frequency of ${target} Values`}
        x={160}
        y={45}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis
        label={`${target} Values`}
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
          .map((row) => ({ x: row.concentration }))}
      ></VictoryHistogram>
    </VictoryChart>
  );
};

export default DashboardHistogram;
