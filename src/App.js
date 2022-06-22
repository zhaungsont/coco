import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Backdrop from "./components/Backdrop";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
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
    <AuthProvider>
    {/* <ThemeProvider theme={darkTheme}> */}
        <Backdrop />


        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login onAuthSuccess={loggedInModal} />} />
          <Route path="/signup" exact element={<Signup onAuthSuccess={loggedInModal} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

        <ToastContainer className="p-3" position="top-center">
          <Toast show={showAuthMsg}>
            <Toast.Body>{authMsg}</Toast.Body>
          </Toast>
        </ToastContainer>

    {/* </ThemeProvider> */}
    </AuthProvider>
    </div>
  );
}

export default App;
