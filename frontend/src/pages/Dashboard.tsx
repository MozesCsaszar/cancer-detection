import React from "react";
import { useAsyncData } from "../hooks/useAsyncData";
import { Stack, Box } from "@mui/material";
import LoadingScreen from "../features/LoadingScreen/LoadingScreen";

import DashboardBoxplot from "../features/DashboardBoxplot";
import DashboardHistogram from "../features/DashboardHistogram";
import DashboardScatter from "../features/DashboardScatter";

export const Dashboard: React.FC = () => {
  const { data, loading, error } = useAsyncData();

  console.log(
    data.filter((row) => row.target === "B2M").map((row) => row.concentration)
  );

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
          <Stack>
            <Box sx={{ display: "flex", flex: 1 }}>
              {/* Inputs */}
              <Stack sx={{ flex: 1 }}></Stack>
              {/* Three boxplots */}
              <Box sx={{ display: "flex", flex: 4 }}>
                <DashboardBoxplot
                  data={data}
                  boxOneStage="Early"
                ></DashboardBoxplot>
                <DashboardBoxplot
                  data={data}
                  boxOneStage="Late"
                ></DashboardBoxplot>
                <DashboardBoxplot
                  data={data}
                  boxOneStage="Any"
                ></DashboardBoxplot>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flex: 2 }}>
              {/* Inputs */}
              <Stack sx={{ flex: 1 }}></Stack>
              <Box sx={{ display: "flex", flex: 4 }}>
                {/* Scatterplot */}
                <Box sx={{ flex: 2 }}>
                  <DashboardScatter data={data}></DashboardScatter>
                </Box>

                {/* Histograms */}
                <Stack sx={{ flex: 1 }}>
                  <DashboardHistogram
                    data={data}
                    target={"B2M"}
                  ></DashboardHistogram>
                  <DashboardHistogram
                    data={data}
                    target={"TP53"}
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
