import React, { useEffect, useState } from "react";
import classes from "./Backdrop.module.css";
import { useTheme } from '@mui/material/styles';
import { useBG } from "../contexts/BackgroundContext";

export default function Backdrop(){
    const { bgURLArray, modeSelected, lightBGSelected, darkBGSelected } = useBG();

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    // console.log(theme);

    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    return(
        <section className={classes.bgsection}>
        {bgURLArray && 
            <img src={ darkMode ? bgURLArray[darkBGSelected] : bgURLArray[lightBGSelected] }></img>
        }

        </section>
    )
}