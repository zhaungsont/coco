import React, { useEffect, useState } from "react";
import classes from "./Backdrop.module.css";
import { useTheme } from '@mui/material/styles';

export default function Backdrop(){
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    console.log(theme);

    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    return(
        <section className={classes.bgsection}>
            <img src={ darkMode ? "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : "https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}></img>
        </section>
    )
}