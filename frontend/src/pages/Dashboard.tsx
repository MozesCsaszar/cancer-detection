import React, { useContext } from "react";
import { Stack, Box } from "@mui/material";

import DashboardHistogram from "../features/DashboardHistogram";
import DashboardScatter from "../features/DashboardScatter";
import { useSelectTarget } from "../hooks/useSelectTarget";
import DashboardBoxplot from "../features/DashboardBoxplot";
import DashboardTargetSelect from "../features/DashboardTargetSelect";
import { DataContext } from "../domain/contexts";

export const Dashboard: React.FC = () => {
  const data = useContext(DataContext);

  const [target, setTarget, targetVariable, setTargetVariable] =
    useSelectTarget();
  const [targetX, setTargetX, targetVariableX, setTargetVariableX] =
    useSelectTarget();
  const [targetY, setTargetY, targetVariableY, setTargetVariableY] =
    useSelectTarget("TP53");

  return (
    <Stack
      sx={{
        flex: 1,
        padding: "2rem",
        height: "100%",
        maxHeight: "100%",
        minHeight: 0,
      }}
    >
      {/* Top row with boxplots */}
      <Box sx={{ display: "flex", flex: 1, gap: "1rem" }}>
        {/* Inputs */}
        <Stack sx={{ justifyContent: "center", flex: 1 }}>
          <DashboardTargetSelect
            title="Select Boxplot Variables"
            target={target}
            setTarget={setTarget}
            targetVariable={targetVariable}
            setTargetVariable={setTargetVariable}
          ></DashboardTargetSelect>
        </Stack>

        {/* Three boxplots */}
        <Box sx={{ display: "flex", flex: 4 }}>
          <DashboardBoxplot
            data={data}
            boxOneStage="Early"
            target={target}
            targetVariable={targetVariable}
          ></DashboardBoxplot>
          <DashboardBoxplot
            data={data}
            boxOneStage="Late"
            target={target}
            targetVariable={targetVariable}
          ></DashboardBoxplot>
          <DashboardBoxplot
            data={data}
            boxOneStage="Any"
            target={target}
            targetVariable={targetVariable}
          ></DashboardBoxplot>
        </Box>
      </Box>
      {/* Bottom row with scatterplot */}
      <Box sx={{ display: "flex", flex: 2, gap: "1rem", minHeight: 0 }}>
        {/* Inputs */}
        <Stack sx={{ flex: 1, gap: "2rem", justifyContent: "center" }}>
          <DashboardTargetSelect
            title="Select X-Axis Variables"
            target={targetX}
            setTarget={setTargetX}
            targetVariable={targetVariableX}
            setTargetVariable={setTargetVariableX}
          ></DashboardTargetSelect>
          <DashboardTargetSelect
            title="Select Y-Axis Variables"
            target={targetY}
            setTarget={setTargetY}
            targetVariable={targetVariableY}
            setTargetVariable={setTargetVariableY}
          ></DashboardTargetSelect>
        </Stack>
        <Box sx={{ height: "100%", display: "flex", flex: 4 }}>
          {/* Scatterplot */}
          <Box sx={{ flex: 2 }}>
            <DashboardScatter
              data={data}
              targetX={targetX}
              targetVariableX={targetVariableX}
              targetY={targetY}
              targetVariableY={targetVariableY}
            ></DashboardScatter>
          </Box>

          {/* Histograms */}
          <Stack sx={{ justifyContent: "center", flex: 1, minHeight: 0 }}>
            <Box>
              <DashboardHistogram
                data={data}
                target={targetX}
                targetVariable={targetVariableX}
              ></DashboardHistogram>
            </Box>

            <Box sx={{ marginTop: "-2rem" }}>
              <DashboardHistogram
                data={data}
                target={targetY}
                targetVariable={targetVariableY}
              ></DashboardHistogram>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
