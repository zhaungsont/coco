import React, { useEffect, useState, useContext, useMemo } from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Signup from "./components/Signup";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPW from "./components/ResetPW";
import UpdateAccount from "./components/UpdateAccount";


import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import Cat from "./components/Cat";
import { useBG } from "./contexts/BackgroundContext";

function App() {
  
  // Get user mode pref
  const { modeSelected } = useBG();
  console.log(modeSelected)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
    createTheme({
      palette: {
        mode: modeSelected == 2 ? (prefersDarkMode ? 'dark' : 'light') : (modeSelected == 0 ? 'light' : 'dark')
        // mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode, modeSelected],
  );
  

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
    {/* <AuthProvider> */}
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* <BackgroundProvider> */}
        <Backdrop />

        
            <Routes>

              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path="/" element={<Home onThemeChange={themeChangeHandler} />} />
              </Route>

              <Route exact path='/settings' element={<PrivateRoute/>}>
                <Route exact path="/settings" element={<UpdateAccount />} />
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

              <Route path="cat" element={<Cat />} />
            </Routes>
        

        <ToastContainer className="p-3" position="top-center">
          <Toast show={showAuthMsg} bg={prefersDarkMode ? "dark" : "light"}>
            <Toast.Body>{authMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
    {/* </BackgroundProvider> */}
    </ThemeProvider>
    {/* </AuthProvider> */}
    </div>
  );
}

export default App;
