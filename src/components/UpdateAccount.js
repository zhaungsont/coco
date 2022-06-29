import React, {useEffect, useState, useRef} from 'react'
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import classes from "./UpdateAccount.module.css";
import { Link, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from "../contexts/AuthContext"; 

import Alert from 'react-bootstrap/Alert';

import { database } from '../Firebase';
import { uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import ThemeSelection from './ThemeSelection';

import { ref, onValue } from "firebase/database";


export default function UpdateAccount() {
    let navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    
    const { currentUser, updateEmail, updatePassword, updateUserName, updateUserImage, setUserImage, updateStatus } = useAuth()
    const currentEmail = currentUser.email;
    const currentName = currentUser.displayName || '';
    const currentPhoto = currentUser.photoURL || process.env.PUBLIC_URL + "/default-user.png";
    // const [currentPhoto, setCurrentPhoto] = useState(`${process.env.PUBLIC_URL}/default-user.png`);

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
    const [imageUpload, setImageUpload] = useState(null);
    const [imgName, setImgName] = useState('');

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
        // update status
        if (status){
            updateStatus(status);
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

    function imgUpdateHandler(){
        if (imageUpload != null){
            console.log('about to upload img!'); 
            setError('');
            setError('');
            updateUserImage(imageUpload)
            .then(()=>{
                setSuccess('Image uploaded!');
                setImgName('');
                setUserImage()
                .then((res)=>{
                    res.items.forEach(item => {
                        getDownloadURL(item).then(url => {
                            console.log(url);
                            currentUser.updateProfile({photoURL: url})
                            .then(()=>{
                                console.log('success');
                                window.location.reload();

                            })
                            .catch(()=>{console.log('failed')})
                        });
                    });


                }).catch((err)=>{
                    setError('An error occurred when setting your photo as profile picture.');
                    console.error(err);

                })
            })
            .catch(()=>{
                setError('An error occurred when uploading your photo.')
            })
            
        }
    }

    function imgChosenHandler(e){
        setError('');
        setSuccess('');  
        setImgName(e.target.files[0].name);
        setImageUpload(e.target.files[0]);
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

    return (
    <div>
    <Link to="/">
        <IconButton>
            <HomeIcon fontSize="large" />
        </IconButton>
    </Link>
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
                        <h2>Personal Info</h2>
                        <div className={classes.infoWrapper}>

                            <div className={classes.imgUpload}>
                                <div className={classes.imageCropper}>
                                    <img src={currentPhoto}></img>
                                </div>
                                {/* <div> */}
                                    <label htmlFor="icon-button-file">
                                        <Input accept="image/*" id="icon-button-file" type="file" onChange={imgChosenHandler} />
                                        <IconButton color="primary" aria-label="upload picture" component="span" size="large" color="info">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>

                                    {imgName}

                                    <label htmlFor="contained-button-file">
                                        <Button onClick={imgUpdateHandler} variant="contained" component="span" color='info' >
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
                                            helperText='Leave blank to stay the same'
                                            placeholder="Passwords must be at least 6 charachters long."
                                            />
                                        <TextField 
                                            label="Confirm Password" 
                                            variant="standard" 
                                            type="password" 
                                            value={pwConfirm} 
                                            onChange={(e)=>setPWConfirm(e.target.value)} 
                                            helperText='Leave blank to stay the same' 
                                            placeholder="Passwords must be at least 6 charachters long."
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
                            <h2>Theme Selection</h2>
                            <p>Select your preferred mode, and pick your desired background image for each mode.</p>
                            <ThemeSelection />
                    </div>
                </div>
            </section>
        </Box>
    </div>
    )
}
