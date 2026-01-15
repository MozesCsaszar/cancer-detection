import { Typography } from "@mui/material";
import { type FC } from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryLine,
  VictoryLegend,
} from "victory";

type StatisticsLineplotProps = {
  values: number[];
  validationValues: number[];
  metric: string;
  // if true, clamp the minimum values, else dont
  clampY: boolean;
};

const colors = ["#4b4eff", "#f1c40f"];
const nrTicks = 8;

const StatisticsLineplot: FC<StatisticsLineplotProps> = ({
  values,
  validationValues,
  metric,
  clampY,
}) => {
  // early termination condition
  if (values.length === 0) {
    return <Typography variant="h5">Chart loading...</Typography>;
  }

  const data = [
    values.map((value, index) => ({
      x: index + 1,
      y: value,
    })),
    validationValues.map((value, index) => ({
      x: index + 1,
      y: value,
    })),
  ];

  const minY = Math.min(
    Math.min(...data[0].filter((_, i) => i < 5 || !clampY).map((e) => e.y)),
    Math.min(...data[1].filter((_, i) => i < 5 || !clampY).map((e) => e.y))
  );

  const maxY = Math.max(
    Math.max(...data[0].map((e) => e.y)),
    Math.max(...data[1].map((e) => e.y))
  );

  const min = minY - Math.abs(0.2 * maxY);
  const max = Math.max(0.001, maxY + Math.abs(0.1 * maxY));

  const domainRange = max - min;

  return (
    <VictoryChart theme={VictoryTheme.clean} domain={{ y: [min, max] }}>
      <VictoryLabel
        text={`${metric} and Validation ${metric} after ${values.length} Epochs`}
        x={100}
        y={45}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis
        label={`Epochs`}
        axisValue={min}
        axisLabelComponent={<VictoryLabel dy={-8}></VictoryLabel>}
      ></VictoryAxis>
      {/* Y Axis */}
      <VictoryAxis
        dependentAxis
        label={`${metric} Values`}
        domain={{ y: [min, max] }}
        tickValues={Array.from(
          { length: nrTicks },
          (_, i) => min + (i * domainRange) / (nrTicks - 1)
        )}
        tickFormat={(t: number) => t?.toFixed(2)}
        axisLabelComponent={<VictoryLabel dx={10} dy={-14}></VictoryLabel>}
      ></VictoryAxis>
      <VictoryLegend
        x={150}
        y={215}
        orientation="horizontal"
        borderPadding={0}
        gutter={10}
        style={{
          labels: { fontSize: 10 },
        }}
        data={[
          { name: metric, symbol: { fill: colors[0] } },
          { name: `Validation ${metric}`, symbol: { fill: colors[1] } },
        ]}
      />
      {/* Horizontal rulers */}
      <VictoryLine
        data={[
          { x: 1, y: values[0] },
          { x: values.length, y: values.at(-1) },
        ]}
        labels={[`${values.at(-1)!.toFixed(2)}`]}
        labelComponent={
          <VictoryLabel
            dx={6}
            dy={-4}
            textAnchor="start"
            style={{ fontSize: 10, fill: "#666" }}
          />
        }
      />

      {/* Data lines */}
      <VictoryLine
        data={data[0]}
        style={{ data: { stroke: colors[0] } }}
      ></VictoryLine>
      <VictoryLine
        data={data[1]}
        style={{ data: { stroke: colors[1], strokeDasharray: "5,5" } }}
      ></VictoryLine>
    </VictoryChart>
  );
};

export default StatisticsLineplot;
