import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { PolarArea } from 'react-chartjs-2';

import classes from "./chartPanel.module.css";


export default function C3(props) {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const taskList = props.data;
    const [createdHours, setCreatedHours] = useState([]);
    const [completeHours, setCompleteHours] = useState([]);

    useEffect(()=>{
        const taskCreatedHours = taskList.map(t => t.shour);
        const taskCompleteHours = taskList.filter(t => t.done).map(t => t.ehour);
        
        const tempCreatedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const tempCompleteData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log(taskCreatedHours);
        
        taskCreatedHours.forEach(h => tempCreatedData[h]++);
        console.log(tempCreatedData);
        taskCompleteHours.forEach(h => tempCompleteData[h]++);

        setCreatedHours(tempCreatedData);
        setCompleteHours(tempCompleteData);

    }, [taskList])

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Creation Versus Completion of Tasks by Hour',
            color: darkMode ? "rgba(240, 235, 227, 1)" : "rgba(44, 54, 57, 1)"
        },
        },
        maintainAspectRatio:false,
        color: darkMode ? "rgba(240, 235, 227, 1)" : "rgba(44, 54, 57, 1)",
    };

    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    const lineData = {
        labels,
        datasets: [
        {
            label: 'Hour of Creation',
            data: createdHours,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Hour of Completion',
            data: completeHours,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        ],
    };


    return (
        <div>
            
            <div style={{height:'15rem', margin: '1rem 0', padding: '1rem'}} className={darkMode ? `${classes.darkPanel}` : `${classes.lightPanel}`}>
                {/* <PolarArea data={data} /> */}
                <Line options={options} data={lineData} />
            </div>
        </div>
    )
}
