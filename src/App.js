import React, { useEffect, useState, useContext } from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Signup from "./components/Signup";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import ColorModeContext from "./contexts/ColorModeContext"
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
    }, 3000);
  }

  // useEffect(()=>{
    
  // },[])
  return (
    <div>
    {/* <ColorModeContext> */}
        <Backdrop />

        {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}

    <AuthProvider>
        <Routes>
        {/* <Route path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
        ></Route> */}

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route path='/login' element={<PublicRoute />}>
            <Route path="/login" exact element={<Login onAuthSuccess={loggedInModal} />} />
          </Route>

          <Route path='/signup' element={<PublicRoute />}>
            <Route path="/signup" exact element={<Signup onAuthSuccess={loggedInModal} />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
    </AuthProvider>

        <ToastContainer className="p-3" position="top-center">
          <Toast show={showAuthMsg}>
            <Toast.Body>{authMsg}</Toast.Body>
          </Toast>
        </ToastContainer>

    {/* </ColorModeContext> */}
    </div>
  );
}

export default App;
