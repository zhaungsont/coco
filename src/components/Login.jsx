import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './auth.module.css';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { useTheme } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../contexts/AuthContext"; 
import { setUserProperties } from "firebase/analytics";

export default function Login(props){
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    let navigate = useNavigate();

    let width = window.innerWidth;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false)

    const { login } = useAuth();

    function emailHandler(e){
        setEmail(e.target.value);
    }

    function passwordHandler(e){
        setPassword(e.target.value);
    }

    async function submitHandler(e){
        e.preventDefault();
        console.log(`trying to LOG IN: + ${email} and ${password}`)
        setSubmitting(true);
        setError('');
        try {
            await login(email, password);
            // Login successful
            props.onAuthSuccess('login');
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2250);
        } catch {
            setError('Log in failed. Please try again.')
            setSubmitting(false);
        }
        setSubmitting(false);
    }

    return(
        <section id="content-structure">
        <div className={classes.wrapper}>
            {/* This div below prevents the forsted glass pane and sign up link become horizontally divided
            due to the {classes.wrapper} flexbox */}
            <div>
                <div className={`${classes.formDiv} ${darkMode? `dark-frosted-glass` : `light-frosted-glass`}`}>
                    <Form onSubmit={submitHandler}>
                    <h1 className={classes.title}>Login</h1>

                    {error && <Alert variant="danger"> {error} </Alert>}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={emailHandler} type="email" size={width < 480 ? "lg" : "md"} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={passwordHandler} size={width < 480 ? "lg" : "md"} placeholder="Password" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant={darkMode ? "outline-light" : "secondary"} size={width < 480 ? "lg" : "md"} type="submit" disabled={submitting}>
                                Log In
                            </Button>
                        </div>
                        <div className={classes.additionals}>
                            {/* <Form.Text className="text-muted"> */}
                            Forgot password? <Link to="/pwreset" >Reset now</Link>.
                            {/* </Form.Text>  */}
                        </div>
                    </Form>
                </div>
                <div className={classes.additionals}>
                    {/* <Form.Text className="text-muted"> */}
                    Don't have an account yet? <Link to="/signup" >Sign up here</Link>.
                    {/* </Form.Text>  */}
                </div>
            </div>
        </div>
    </section>
    )
}
