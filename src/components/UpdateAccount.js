import React, {useEffect, useState, useRef} from 'react'
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import classes from "./UpdateAccount.module.css";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { useAuth } from "../contexts/AuthContext"; 

import Alert from 'react-bootstrap/Alert';

export default function UpdateAccount() {
    let navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    
    const { currentUser, updateEmail, updatePassword, updateUserName, updateUserImage } = useAuth()
    const currentEmail = currentUser.email;
    const currentName = currentUser.displayName || '';
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const Input = styled('input')({
        display: 'none',
    });

    // const dummyName = 'Michael Chuang';
    // const dummyEmail = 'zhsont@gmail.com';

    const [username, setUserName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);
    const [password, setPassword] = useState('');
    const [pwConfirm, setPWConfirm] = useState('');
    const [status, setStatus] = useState('');

    function updateHandler(e){
        setError('');
        setSuccess('');
        setSubmitting(true)
        e.preventDefault();
        console.log('trying to update!');

        if (pwConfirm !== password) {
            console.log('password incorrect!');
            setSubmitting(false);
            return setError('The two password input fields do not match!');
        }

        console.log('About to update profile!')
        const promises = [];
        // update username
        if (username !== currentName){
            promises.push(updateUserName(username));
        }
        // update email
        if (email !== currentEmail){
            promises.push(updateEmail(email));
        }
        // update password
        if (password){
            promises.push(updatePassword(password));
        }

        // update pfp

        Promise.all(promises).then(() => {
            // navigate("/");
            setSuccess('All info updated!');
        }).catch(()=>{
            setError('Failed to update your account information.')
        }).finally(()=>{
            setSubmitting(false);
        })
    }

    useEffect(()=>{
        console.log("current name: " + currentName);
        console.log("current email: " + currentEmail);
    }, []);

    return (
    <div>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            width: "100%",
            height: "100vh",
            },
        }}
        >
            <section id="content-structure">
                <div className="frosted-glass">
                    <div className="content-title">
                        <div className={classes.headerWrapper}>
                            <h1>Settings</h1>
                        </div>
                    </div>
                    <div className={classes.personalInfo}>
                        <h3>Personal Info</h3>
                        <div className={classes.infoWrapper}>

                            <div className={classes.imgUpload}>
                                <img src={process.env.PUBLIC_URL + "/default-user.png"}></img>

                                {/* <div> */}
                                    <label htmlFor="icon-button-file">
                                        <Input accept="image/*" id="icon-button-file" type="file" />
                                        <IconButton color="primary" aria-label="upload picture" component="span" size="large" color="info">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>

                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" component="span" color='info' onClick={()=>{console.log('clicked')}}>
                                            Upload
                                        </Button>
                                    </label>
                                {/* </div> */}
                            </div>

                            <div className={classes.editPersonalInfo}>
                            {error && <Alert variant="danger"> {error} </Alert>}
                            {success && <Alert variant="success"> {success} </Alert>}

                                    <Box
                                    onSubmit={updateHandler}
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { width: '100%' },
                                    }}
                                    autoComplete="off"
                                    >
                                        <TextField 
                                            label="User Name" 
                                            variant="standard" 
                                            value={username} 
                                            onChange={(e)=>setUserName(e.target.value)} 
                                            placeholder='Empty' />
                                        <TextField 
                                            label="Email Account" 
                                            type="email" 
                                            variant="standard" 
                                            value={email} 
                                            onChange={(e)=>setEmail(e.target.value)} 
                                            required />
                                        <TextField 
                                            label="Password" 
                                            variant="standard" 
                                            value={password} 
                                            onChange={(e)=>setPassword(e.target.value)} 
                                            type="password" 
                                            placeholder='Leave blank to stay the same'
                                            helperText="Passwords must be at least 6 charachters long."
                                            />
                                        <TextField 
                                            label="Confirm Password" 
                                            variant="standard" 
                                            type="password" 
                                            value={pwConfirm} 
                                            onChange={(e)=>setPWConfirm(e.target.value)} 
                                            placeholder='Leave blank to stay the same' 
                                            helperText="Passwords must be at least 6 charachters long."
                                            />
                                            
                                        <TextField
                                            label="Status"
                                            multiline
                                            variant="standard" 
                                            rows={3}
                                            value={status}
                                            onChange={(e)=>setStatus(e.target.value)}
                                            placeholder="This will appear below your profile picture in the sidebar."
                                        />
                                        <div className={classes.btnWrapper}>
                                            <Button type='submit' variant="contained" color='info' disabled={submitting} >Save</Button>
                                        </div>
                                    </Box>

                            </div>


                        </div>
                    </div>
                    
                    <div className={classes.dividerWrapper}>
                        <Divider />
                    </div>

                    <div className={classes.themeSelection}>
                            <h3>Theme Selection</h3>
                            <p>Lorem ipsum</p>
                    </div>
                </div>
            </section>
        </Box>
    </div>
    )
}
