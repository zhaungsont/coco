import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './auth.module.css';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';


import { useAuth } from "../contexts/AuthContext"; 

export default function ResetPW() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    let navigate = useNavigate();
    
    let width = window.innerWidth;
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('')
    const [resetting, setresetting] = useState(false)

    const { resetPassword } = useAuth();

    function emailHandler(e){
        setEmail(e.target.value);
    }

    async function resetHandler(e){
        e.preventDefault();
        console.log(`trying to reset user ${email}'s password!`)
        setresetting(true);
        setError('');
        setInfo('');
        try {
            await resetPassword(email);
            // props.onAuthSuccess('signup');
            setInfo('Password reset email sent! Please check your inbox for further instructions.')
        } catch {
            setError('An error occurred. Please make sure the email you entered is correct.')
            setresetting(false);
        }
        setresetting(false);
    }



    return (
    <section id="content-structure">
        <div className={classes.wrapper}>
            {/* This div below prevents the forsted glass pane and sign up link become horizontally divided
            due to the {classes.wrapper} flexbox */}
            <div>
                <div className={`${classes.formDiv} ${darkMode? `dark-frosted-glass` : `light-frosted-glass`}`}>
                    <Form onSubmit={resetHandler}>
                    <h1 className={classes.title}>Password Reset</h1>

                    {error && <Alert variant="danger"> {error} </Alert>}
                    {info && <Alert variant="primary"> {info} </Alert>}

                        <p>Enter your email address to below and we will send a password reset mail to you.</p>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={emailHandler} type="email" size={width < 480 ? "lg" : "md"} placeholder="Enter email" autoFocus={true} />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant={darkMode ? "outline-light" : "secondary"} size={width < 480 ? "lg" : "md"} type="submit" disabled={resetting}>
                                Reset Password
                            </Button>
                        </div>
                        <div className={classes.additionals}>
                            {/* <Form.Text className="text-muted"> */}
                            <Link to="/login" >Log in</Link>
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
)}