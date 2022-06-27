import React, { useEffect, useState, useContext, useMemo } from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Signup from "./components/Signup";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPW from "./components/ResetPW";
import UpdateAccount from "./components/UpdateAccount";

// import ColorModeContext from "./contexts/ColorModeContext"
// import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );
  const [mode, setMode] = useState(theme);
    

  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);

  const [showAuthMsg, setShowAuthMsg] = useState(false);
  const [authMsg, setAutgMsg] = useState('')

  function loggedInModal(type){
    setShowAuthMsg(true);
    if (type === 'login'){
      setAutgMsg("You're Logged In! Redirecting...");
    } else {
      setAutgMsg("You're Registered! Siging in...")
    }
    setTimeout(() => {
      setShowAuthMsg(false)
    }, 2000);
  }


  function themeChangeHandler(){
    // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }
  return (
    <div>
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <Backdrop />

        <AuthProvider>
            <Routes>

              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path="/" element={<Home onThemeChange={themeChangeHandler} />} />
              </Route>

              <Route exact path='/updateuser' element={<PrivateRoute/>}>
                <Route exact path="/updateuser" element={<UpdateAccount />} />
              </Route>

              <Route path='/login' element={<PublicRoute />}>
                <Route path="/login" exact element={<Login onAuthSuccess={loggedInModal} />} />
              </Route>

              <Route path='/signup' element={<PublicRoute />}>
                <Route path="/signup" exact element={<Signup onAuthSuccess={loggedInModal} />} />
              </Route>

              <Route path="/pwreset" element={<PublicRoute />}>
                <Route path="/pwreset" element={<ResetPW />} />
              </Route>

              <Route path="*" element={<NoMatch />} />
            </Routes>
        </AuthProvider>

        <ToastContainer className="p-3" position="top-center">
          <Toast show={showAuthMsg} bg={prefersDarkMode ? "dark" : "light"}>
            <Toast.Body>{authMsg}</Toast.Body>
          </Toast>
        </ToastContainer>

    </ThemeProvider>
    </div>
  );
}

export default App;
