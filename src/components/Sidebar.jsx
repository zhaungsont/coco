import React, {useEffect, useState} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import classes from "./Sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Switch from '@mui/material/Switch';

import { useTheme } from '@mui/material/styles';

import { database } from '../Firebase';
import { ref, onValue } from "firebase/database";

import { Button as MButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Sidebar(props) {
    const [status, setStatus] = useState('');


    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    let navigate = useNavigate();

    const { currentUser, logout } = useAuth();
    const currentPhoto = currentUser.photoURL || process.env.PUBLIC_URL + "/default-user.png";

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

    // get Personal status
    useEffect(()=>{
        const statusRef = ref(database, `settings/${currentUser.uid}/status`);
        onValue(statusRef, (snapshot) => {
            try {
                const status = snapshot.val().status;
                setStatus(status);
            } catch {
                console.log('no saved user status. Proceed to do nothing.')
            }
        }) 
    }, [currentUser])

    const pathName = window.location.pathname;
    return (
        <>

            <Offcanvas show={props.show} onHide={props.handleClose} style={{backgroundColor: darkMode ? "#191919" : "#fff"}}>
                <Offcanvas.Header closeButton closeVariant={darkMode ? "white" : ""}>
                    <Offcanvas.Title>
                        <div className={classes.logoTitle}>Coco.</div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                <img className={classes.avatar} src={currentPhoto}></img>

                
                <div className={classes.sidebar}>
                    <h1 className={classes.username}>{currentUser.displayName ? currentUser.displayName : 'Cocoer'}</h1>
                    <p className={classes.email}><strong >Email: </strong>{currentUser.email}</p>
                    {status && <p className={classes.status}>{status}</p>}

                    <div className={classes.menu}>
                        <ul>
                            <li>
                                <Link to="/">
                                    <div className={`${classes.menuBtn} ${pathName === '/' && classes.currentLocation}`}>
                                        <div className={classes.menuIcon}>
                                            <SettingsIcon />
                                        </div>
                                        <div className={classes.menuName}>
                                            Dashboard
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">
                                    <div className={`${classes.menuBtn} ${pathName === '/settings' && classes.currentLocation}`}>
                                        <div className={classes.menuIcon}>
                                            <SettingsIcon />
                                        </div>
                                        <div className={classes.menuName}>
                                            Settings
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <a href="https://github.com/zhaungsont/coco">
                                    <div className={`${classes.menuBtn}`}>
                                        <div className={classes.menuIcon}>
                                            <GitHubIcon />
                                        </div>
                                        <div className={classes.menuName}>
                                            GitHub
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className={classes.bottom}>
                    {error && <Alert variant="danger">
                        {error}
                    </Alert>}


                    <div className={`d-grid gap-2 ${classes.logoutBtn}`}>
                        <Button variant="outline-secondary" onClick={logoutHandler}>
                            Log out
                        </Button>
                    </div>
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
