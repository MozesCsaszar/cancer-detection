import { type FC } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

type NavigationBarButtonProps = {
  text: string;
  to: string;
  borderWidth: number;
};

const NavigationBarButton: FC<NavigationBarButtonProps> = ({
  to,
  text,
  borderWidth,
}) => (
  <Button
    component={NavLink}
    to={to}
    variant="contained"
    disableElevation
    sx={{
      borderRadius: 0,
      borderBottom: `${borderWidth}px solid black`,
      textAlign: "center",
      "&.active": {
        color: "black",
        borderBottomColor: "purple",
      },
    }}
  >
    {text}
  </Button>
);

export default NavigationBarButton;
