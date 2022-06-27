import React, {useEffect, useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function UpdateAccount() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

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
            <Paper />
        </Box>
    </div>
    )
}
