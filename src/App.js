import React from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";

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
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
