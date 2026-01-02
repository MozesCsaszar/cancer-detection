import { Box, Stack } from "@mui/material";
import "./App.css";
import NavigationBar from "./features/NavigationBar";
import { DataCenter } from "./pages/DataCenter";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";

function App() {
  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <NavigationBar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/data" element={<DataCenter />}></Route>
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
