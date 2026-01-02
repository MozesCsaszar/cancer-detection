import { Typography } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface LoadingScreenProps {
  loading: boolean;
  error: string;
  createComponent: () => ReactNode;
}

const LoadingScreen: FC<LoadingScreenProps> = ({
  loading,
  error,
  createComponent,
}) => {
  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error !== "") {
    return (
      <Typography variant="h5" color="error">
        error: {error}
      </Typography>
    );
  }

  return createComponent();
};

export default LoadingScreen;
