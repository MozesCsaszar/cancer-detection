import { Box, Stack } from "@mui/material";
import "./App.css";
import NavigationBar from "./features/NavigationBar/NavigationBar";
import { DataCenter } from "./pages/DataCenter";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { useAsyncData } from "./hooks/useAsyncData";
import LoadingScreen from "./features/LoadingScreen/LoadingScreen";
import { DataContext } from "./domain/contexts";
import { AICenter } from "./pages/AICenter";

function App() {
  const { data, loading, error } = useAsyncData();

  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <NavigationBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          minHeight: 0,
        }}
      >
        <LoadingScreen
          loading={loading}
          error={error}
          createComponent={() => (
            <DataContext value={data}>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/data" element={<DataCenter />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/ai" element={<AICenter />}></Route>
              </Routes>
            </DataContext>
          )}
        ></LoadingScreen>
      </Box>
    </Stack>
  );
}

export default App;
