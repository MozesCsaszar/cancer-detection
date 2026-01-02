import { type FC } from "react";
import { Box, Stack } from "@mui/material";
import NavigationBarButton from "./NavigationBarButton";

interface NavigationBarProps {}

const borderWidth = 3;

const NavigationBar: FC<NavigationBarProps> = () => (
  <Stack>
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <NavigationBarButton
        to=""
        text="Home"
        borderWidth={borderWidth}
      ></NavigationBarButton>
      <NavigationBarButton
        to="/data"
        text="Data Center"
        borderWidth={borderWidth}
      ></NavigationBarButton>
      <NavigationBarButton
        to="/dashboard"
        text="Dashboard"
        borderWidth={borderWidth}
      ></NavigationBarButton>
      <NavigationBarButton
        to="/ai"
        text="Artificial Intelligence Center"
        borderWidth={borderWidth}
      ></NavigationBarButton>
    </Box>
    {/* Full-length underline */}
    <Box
      sx={{
        borderBottom: `${borderWidth}px solid black`,
        position: "relative",
        top: `-${borderWidth - 0.5}px`,
        marginBottom: `-${borderWidth - 0.5}px`,
        height: "0",
      }}
    ></Box>
  </Stack>
);

export default NavigationBar;
