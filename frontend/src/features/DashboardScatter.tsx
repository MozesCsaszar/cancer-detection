import { useMemo, type FC } from "react";
import type { DataEntry, DETargetType } from "../domain/entries";
import {
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
  VictoryTooltip,
} from "victory";
import {
  deNumericalVariables,
  type DENumericalVariablesType,
} from "../domain/entries";
import { startCase } from "lodash";

type DashboardScatterProps = {
  data: DataEntry[];
  targetX: DETargetType;
  targetVariableX: DENumericalVariablesType;
  targetY: DETargetType;
  targetVariableY: DENumericalVariablesType;
};

const DashboardScatter: FC<DashboardScatterProps> = ({
  data,
  targetX,
  targetVariableX,
  targetY,
  targetVariableY,
}) => {
  const [scatterData, ids] = useMemo(() => {
    // store scatter data values
    const scatterData = new Map<
      Number,
      Map<DETargetType, Map<DENumericalVariablesType, number>>
    >();
    // store all the unique ids
    const ids = new Array(...new Set(data.map((row) => row.ID)));

    // extract the B2M and TP53 target variables
    data.forEach((row) => {
      if (!scatterData.get(row.ID)) {
        scatterData.set(row.ID, new Map());
      }

      scatterData.get(row.ID)?.set(row.target, new Map());

      deNumericalVariables.forEach((targetVariable) => {
        scatterData
          .get(row.ID)
          ?.get(row.target)
          ?.set(targetVariable, row[targetVariable]);
      });
    });
    return [scatterData, ids];
  }, [data]);

  // rename them to x and y
  const displayData = ids.map((id) => ({
    x: scatterData.get(id)!.get(targetX)!.get(targetVariableX)! + 1,
    y: scatterData.get(id)!.get(targetY)!.get(targetVariableY)! + 1,
  }));

  const xVarName = `${targetX} ${startCase(targetVariableX)}`;
  const yVarName = `${targetY} ${startCase(targetVariableY)}`;

  return (
    <VictoryChart domainPadding={0.015} theme={VictoryTheme.clean} scale="log">
      <VictoryLabel
        text={`${xVarName}  to ${yVarName} Values`}
        x={50}
        y={30}
      ></VictoryLabel>
      {/* X Axis */}
      <VictoryAxis
        label={`log ${xVarName} + 1`}
        axisLabelComponent={<VictoryLabel dy={-8}></VictoryLabel>}
      ></VictoryAxis>
      {/* Y Axis */}
      <VictoryAxis
        dependentAxis
        label={`log ${yVarName} + 1`}
        axisLabelComponent={<VictoryLabel dx={0}></VictoryLabel>}
      ></VictoryAxis>
      <VictoryScatter
        size={3}
        data={displayData}
        labels={({ datum }) =>
          `${xVarName}: ${datum.x.toFixed(2)}\n${yVarName}: ${datum.y.toFixed(
            2
          )}`
        }
        labelComponent={<VictoryTooltip dy={-10} />}
      ></VictoryScatter>
    </VictoryChart>
  );
};

export default DashboardScatter;
