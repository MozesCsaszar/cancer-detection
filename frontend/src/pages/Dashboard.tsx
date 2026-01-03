import React from "react";
import { useAsyncData } from "../hooks/useAsyncData";
import { Stack, Box } from "@mui/material";
import LoadingScreen from "../features/LoadingScreen/LoadingScreen";

import DashboardHistogram from "../features/DashboardHistogram";
import DashboardScatter from "../features/DashboardScatter";
import { useSelectTarget } from "../hooks/useSelectTarget";
import DashboardBoxplot from "../features/DashboardBoxplot";
import DashboardTargetSelect from "../features/DashboardTargetSelect";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useAsyncData();
  const [target, setTarget, targetVariable, setTargetVariable] =
    useSelectTarget();
  const [targetX, setTargetX, targetVariableX, setTargetVariableX] =
    useSelectTarget();
  const [targetY, setTargetY, targetVariableY, setTargetVariableY] =
    useSelectTarget("TP53");

  return (
    <Box
      style={{
        height: "100%",
      }}
    >
      <LoadingScreen
        loading={loading}
        error={error}
        createComponent={() => (
          <Stack sx={{ flex: 1, minHeight: 0 }}>
            {/* Top row with boxplots */}
            <Box sx={{ display: "flex", flex: 1 }}>
              {/* Inputs */}
              <Box sx={{ flex: 1 }}>
                <DashboardTargetSelect
                  title="Select Boxplot Variables"
                  target={target}
                  setTarget={setTarget}
                  targetVariable={targetVariable}
                  setTargetVariable={setTargetVariable}
                ></DashboardTargetSelect>
              </Box>

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
            <Box sx={{ display: "flex", flex: 2 }}>
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
              <Box sx={{ display: "flex", flex: 4 }}>
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
                <Stack sx={{ flex: 1 }}>
                  <DashboardHistogram
                    data={data}
                    target={targetX}
                    targetVariable={targetVariableX}
                  ></DashboardHistogram>
                  <DashboardHistogram
                    data={data}
                    target={targetY}
                    targetVariable={targetVariableY}
                  ></DashboardHistogram>
                </Stack>
              </Box>
            </Box>
          </Stack>
        )}
      ></LoadingScreen>
    </Box>
  );
};
