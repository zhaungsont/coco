import React, {useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import classes from "./UpdateAccount.module.css";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


export default function UpdateAccount() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const Input = styled('input')({
        display: 'none',
    });

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
                            <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <TextField label="User Name" variant="standard" />
                                <TextField label="Email Account" type="email" variant="standard" />
                                <TextField label="Password (Leave Blank to Stay the Same)" variant="standard" type="password" placeholder='Leave blank to stay the same' />
                                <TextField
                                label="Status"
                                multiline
                                variant="standard" 
                                rows={3}
                                placeholder="This will appear below your profile picture in the sidebar."
                                />
                                <div className={classes.btnWrapper}>
                                    <Button variant="contained" color='info' >Save</Button>
                                </div>
                                </Box>
                            </div>


                        </div>
                    </div>
                    
                    <div className={classes.dividerWrapper}>
                        <Divider variant="middle" />
                    </div>


                </div>
            </section>
        </Box>
    </div>
    )
}
