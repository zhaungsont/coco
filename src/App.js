import React from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div>
    {/* <ThemeProvider theme={darkTheme}> */}
        <Backdrop />
        <Home />
          yolo fefew
    {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
