import { type FC } from "react";
import type { DataEntry } from "../model/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryBoxPlot,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import { startCase } from "lodash";
import type { DETargetType, DENumericalVariablesType } from "../model/entries";

type DashboardBoxplotProps = {
  data: DataEntry[];
  boxOneStage: "Early" | "Late" | "Any";
  target?: DETargetType;
  targetVariable: DENumericalVariablesType;
};

const DashboardBoxplot: FC<DashboardBoxplotProps> = ({
  data,
  boxOneStage,
  target = "B2M",
  targetVariable = "concentration",
}) => {
  const boxOneFilterFunction = (row: DataEntry) => {
    if (boxOneStage === "Any") {
      return row.sampleType === "Patient";
    } else {
      return row.stage === boxOneStage;
    }
  };

  const boxValues = [
    {
      x: `${boxOneStage} Stage Patient`,
      y: data
        .filter((row) => boxOneFilterFunction(row) && row.target === target)
        // add 1 for logarithmic scale
        .map((row) => row[targetVariable] + 1),
    },
    {
      x: "Control",
      y: data
        .filter((row) => row.sampleType === "Control" && row.target === target)
        .map((row) => row[targetVariable] + 1),
    },
  ];

  // const minValue = Math.min(
  //   Math.min(...boxValues[0].y),
  //   Math.min(...boxValues[1].y)
  // );

  // const minExponent = Math.log10(minValue);

  return (
    <VictoryChart
      scale={{ y: "log" }}
      domainPadding={{ x: 100 }}
      theme={VictoryTheme.clean}
    >
      {/* Title */}
      <VictoryLabel
        text={`${target} ${startCase(
          targetVariable
        )} Levels of ${boxOneStage} Stage Patients Vs Control`}
        x={35}
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
        data={boxValues}
      ></VictoryBoxPlot>
    </VictoryChart>
  );
};

export default DashboardBoxplot;
