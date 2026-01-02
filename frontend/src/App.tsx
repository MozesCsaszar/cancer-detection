import { Box, Stack } from "@mui/material";
import "./App.css";
import NavigationBar from "./features/NavigationBar";
import { DataCenter } from "./pages/DataCenter";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <NavigationBar />
      <Box>
        <Routes>
          <Route index element></Route>
          <Route path="/data" element={<DataCenter />}></Route>
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
