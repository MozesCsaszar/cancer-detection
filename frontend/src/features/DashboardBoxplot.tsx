import { type FC } from "react";
import type { DataEntry } from "../model/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryBoxPlot,
  VictoryLabel,
  VictoryAxis,
} from "victory";

type DashboardBoxplotProps = {
  data: DataEntry[];
  boxOneStage: "Early" | "Late" | "Any";
  target?: "B2M" | "TP53";
};

const DashboardBoxplot: FC<DashboardBoxplotProps> = ({
  data,
  boxOneStage,
  target = "B2M",
}) => {
  const boxOneFilterFunction = (row: DataEntry) => {
    if (boxOneStage === "Any") {
      return row.sampleType === "Patient";
    } else {
      return row.stage === boxOneStage;
    }
  };
  return (
    <VictoryChart
      minDomain={{ y: 0.7 }}
      scale={{ y: "log" }}
      domainPadding={{ x: 100 }}
      theme={VictoryTheme.clean}
    >
      {/* Title */}
      <VictoryLabel
        text={`${target} Levels of ${boxOneStage} Stage Patients Vs Control`}
        x={90}
        y={35}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis></VictoryAxis>
      {/* Y Axis */}
      <VictoryAxis
        dependentAxis
        label={`log ${target} + 1`}
        axisLabelComponent={<VictoryLabel dx={0}></VictoryLabel>}
      ></VictoryAxis>
      {/* Plot */}
      // @ts-expect-error: this works just fine
      <VictoryBoxPlot
        boxWidth={70}
        minLabels={({ datum }) => Math.round(datum._min)}
        q1Labels={({ datum }) => Math.round(datum._q1)}
        medianLabels={({ datum }) => Math.round(datum._median)}
        q3Labels={({ datum }) => Math.round(datum._q3)}
        maxLabels={({ datum }) => Math.round(datum._max)}
        data={[
          {
            x: `${boxOneStage} Stage Patient`,
            y: data
              .filter(
                (row) => boxOneFilterFunction(row) && row.target === target
              )
              // add 1 for logarithmic scale
              .map((row) => row.concentration + 1),
          },
          {
            x: "Control",
            y: data
              .filter(
                (row) => row.sampleType === "Control" && row.target === target
              )
              .map((row) => row.concentration + 1),
          },
        ]}
      ></VictoryBoxPlot>
    </VictoryChart>
  );
};

export default DashboardBoxplot;
