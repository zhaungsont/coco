import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import classes from "./C4.module.css"
import { Doughnut } from 'react-chartjs-2';

import { useTheme } from '@mui/material/styles';

export default function C4() {

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    return (
        <div style={{marginBottom: "1rem"}} className={`${classes.C3Grid} ${darkMode ? `${classes.darkPanel}` : `${classes.lightPanel}` } `}>
            <div>
                (ALL TASK FINISH PERCENTAGE)
            </div>
            <div>
                429M Views
                (TASK STREAK IN DAYS)
            </div>
            <div>
                (TASKS IN CATEGORY)
                <Doughnut data={doughnutData} />
            </div>
            <div>
                859 地方媽媽
                ()
            </div>
        </div>
    )
}
