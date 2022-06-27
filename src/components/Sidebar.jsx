import React, {useEffect, useState} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import classes from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Switch from '@mui/material/Switch';

import { useTheme } from '@mui/material/styles';


export default function Sidebar(props) {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    let navigate = useNavigate();

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');

    async function logoutHandler(){
        console.log('tryna log out!');
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch {
            setError('An error occured when logging you out.');
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
            Launch
            </Button> */}
            <Offcanvas show={props.show} onHide={props.handleClose} style={{backgroundColor: darkMode ? "#191919" : "#fff"}}>
                <Offcanvas.Header closeButton closeVariant={darkMode ? "white" : ""}>
                    <Offcanvas.Title>
                        {/* <img className={classes.logo} src={process.env.PUBLIC_URL + "/coco.png"}></img> */}
                        <div className={classes.logoTitle}>Coco.</div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                <img className={classes.avatar} src={process.env.PUBLIC_URL + "/avatar.jpg"}></img>
                
                <Switch
                checked={props.checked}
                onChange={props.onThemeChange}
                inputProps={{ 'aria-label': 'controlled' }}
                />
                
                <div className={classes.sidebar}>
                    <h1 className={classes.username}>Michael Chuang</h1>
                    <p><strong >Email: </strong>{currentUser.email}</p>
                </div>
                
                <div className={classes.bottom}>
                    {error && <Alert variant="danger">
                        {error}
                    </Alert>}

                    <Link to="/updateuser">Edit account info</Link>
                    <div className={`d-grid gap-2 ${classes.logoutBtn}`}>
                    <Button variant="outline-secondary" size="lg" onClick={logoutHandler}>
                        Log out
                    </Button>
                    </div>
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
