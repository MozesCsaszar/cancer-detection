import { type FC } from "react";
import { Box, Typography } from "@mui/material";
import StatisticsLineplot from "./StatisticsLineplot";
import type { TrainingStatistics } from "../../domain/aiModel";

type StatisticsPanelProps = {
  statistics: TrainingStatistics;
  isModelTraining: boolean;
  isModelTrained: boolean;
};

const StatisticsPanel: FC<StatisticsPanelProps> = ({
  statistics,
  isModelTrained,
  isModelTraining,
}) => {
  const statisticsParams = {
    metric: statistics.type === "categorical" ? "Accuracy" : "R-Squared",
    values: statistics.type === "categorical" ? statistics.acc : statistics.r2,
    validationValues:
      statistics.type === "categorical" ? statistics.valAcc : statistics.valR2,
  };

  return (
    <>
      {isModelTraining || isModelTrained ? (
        <>
          <Box sx={{ flex: 1 }}>
            <StatisticsLineplot
              metric="Loss"
              values={statistics.loss}
              validationValues={statistics.valLoss}
              clampY={false}
            ></StatisticsLineplot>
          </Box>
          <Box sx={{ flex: 1 }}>
            <StatisticsLineplot
              metric={statisticsParams.metric}
              values={statisticsParams.values}
              validationValues={statisticsParams.validationValues}
              clampY={statistics.type === "numerical"}
            ></StatisticsLineplot>
          </Box>
        </>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h5"
        >
          Please train a model to see training statistics.
        </Typography>
      )}
    </>
  );
};

export default StatisticsPanel;
