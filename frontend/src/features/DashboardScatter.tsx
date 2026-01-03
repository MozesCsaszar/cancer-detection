import { type FC } from "react";
import type { DataEntry } from "../model/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
  VictoryTooltip,
} from "victory";

type DashboardScatterProps = {
  data: DataEntry[];
};

const DashboardScatter: FC<DashboardScatterProps> = ({ data }) => {
  // store scatter data values
  const scatterData = new Map<Number, { B2M: number; TP53: number }>();
  // store all the unique ids
  const ids = new Array(...new Set(data.map((row) => row.ID)));

  // extract the B2M and TP53 values
  data.forEach((row) => {
    if (!scatterData.get(row.ID)) {
      scatterData.set(row.ID, { B2M: 0, TP53: 0 });
    }
    scatterData.get(row.ID)![row.target as "B2M" | "TP53"] = row.concentration;
  });

  // rename them to x and y
  const displayData = ids.map((id) => ({
    x: scatterData.get(id)!.B2M + 1,
    y: scatterData.get(id)!.TP53 + 1,
  }));

  return (
    <VictoryChart domainPadding={0.015} theme={VictoryTheme.clean} scale="log">
      <VictoryLabel
        text={`Scatter Plot of B2M to TP53 Values`}
        x={120}
        y={30}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis
        label={`log B2M + 1`}
        axisLabelComponent={<VictoryLabel dy={-8}></VictoryLabel>}
      ></VictoryAxis>
      {/* Y Axis */}
      <VictoryAxis
        dependentAxis
        label={`log TP53 + 1`}
        axisLabelComponent={<VictoryLabel dx={0}></VictoryLabel>}
      ></VictoryAxis>
      <VictoryScatter
        size={3}
        data={displayData}
        labels={({ datum }) =>
          `B2M: ${datum.x.toFixed(2)}\nTP53: ${datum.y.toFixed(2)}`
        }
        labelComponent={<VictoryTooltip dy={-10} />}
      ></VictoryScatter>
    </VictoryChart>
  );
};

export default DashboardScatter;
