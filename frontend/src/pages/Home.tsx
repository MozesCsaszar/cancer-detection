import React from "react";
import { Stack, Typography } from "@mui/material";
import { type TypographyProps } from "@mui/material";

const textProps: TypographyProps = {
  variant: "h5",
  sx: {
    paddingX: "2rem",
    marginTop: "1rem",
    textAlign: "center",
  },
};

export const Home: React.FC = () => {
  return (
    <Stack
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "2rem" }}>
        Weclome
      </Typography>
      <Typography {...textProps}>
        To view the data, head to the Data View Center.
      </Typography>
      <Typography {...textProps}>
        To view the visualizations, head to the Dashboard.
      </Typography>
      <Typography {...textProps}>
        To try inferences on the data, head to the Artificial Intelligence
        Center.
      </Typography>
    </Stack>
  );
};
