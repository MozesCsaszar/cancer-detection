import { type FC } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { type ButtonProps } from "@mui/material/Button";

interface NavigationBarProps {}

const borderWidth = 3;

const buttonProps: ButtonProps = {
  variant: "contained",
  disableElevation: true,
  sx: {
    borderRadius: 0,
    borderBottom: `${borderWidth}px solid black`,
    textAlign: "center",
    "&.active": {
      color: "black",
      borderBottomColor: "purple",
    },
  },
  // className: (active: boolean) => (active ? "active" : null),
};

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
      <Button component={NavLink} to="" {...buttonProps}>
        Home
      </Button>
      <Button component={NavLink} to="/data" {...buttonProps}>
        Data View Center
      </Button>
      <Button component={NavLink} to="/dashboard" {...buttonProps}>
        Dashboard
      </Button>
      <Button component={NavLink} to="/ai" {...buttonProps}>
        Artificial Intelligence Center
      </Button>
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
