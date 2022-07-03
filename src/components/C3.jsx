import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { PolarArea } from 'react-chartjs-2';

import classes from "./chartPanel.module.css";


export default function C3() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        },
        maintainAspectRatio:false,
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    // const lineData = {
    //     labels,
    //     datasets: [
    //     {
    //         label: 'Dataset 1',
    //         data: [273, -158, -789, 672, -481, -879, -747, 273, -158, -789, 672, -481, -879, -747, 273, -158, -789, 672, -481, -879, -747, 800, 959],
    //         borderColor: 'rgb(255, 99, 132)',
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //     },
    //     {
    //         label: 'Dataset 2',
    //         data: [-405, -383, -661, -305, -348, 629, -189, -789, 672, -481, -879, -747, 273, -158, -158, -789, 672, -481, 247, -556, 108, 794, -300],
    //         borderColor: 'rgb(53, 162, 235)',
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //     },
    //     ],
    // };

    const data = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 7, 19, 3, 5, 2, 3, 7, 19, 3, 5, 2, 3, 7],
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
            ],
        };

    return (
        <div>
            
            <div style={{height:'15rem', margin: '1rem 0', padding: '1rem'}} className={darkMode ? `${classes.darkPanel}` : `${classes.lightPanel}`}>
                <PolarArea data={data} />
                {/* <Line options={options} data={lineData} /> */}
            </div>
        </div>
    )
}
