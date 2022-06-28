import React, { useEffect, useState } from 'react'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import classes from "./C1.module.css";
import { useAuth } from "../contexts/AuthContext";

import { useTheme } from '@mui/material/styles';

export default function C1(props) {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(true);
    const [chartData1, setChartData1] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [chartData2, setChartData2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const taskList = props.data;

    
    // const taskCreatedInMonthsData = {
    //     jan: [0, 0],
    //     feb: [0, 0],
    //     mar: [0, 0],
    //     apr: [0, 0],
    //     may: [0, 0],
    //     jun: [0, 0],
    //     jul: [0, 0],
    //     aug: [0, 0],
    //     sep: [0, 0],
    //     oct: [0, 0],
    //     nov: [0, 0],
    //     dec: [0, 0],
        
    // }
    const sampleDate = new Date();
    const currentYear = sampleDate.getFullYear();
    const sampleMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const a = taskList.filter(task => task.year == currentYear).map(task => task.month);
    // console.log(a);



    function getAllTasksInMonths(){
        const tempData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const TIM = taskList.filter(task => task.year == currentYear).map(task => task.month);
        TIM.forEach((taskMonth) => {
            switch (taskMonth) {
                case sampleMonths[0]:
                    tempData[0] ++;
                break;

                case sampleMonths[1]:
                    tempData[1] ++;
                break;

                case sampleMonths[2]:
                    tempData[2] ++;
                break;

                case sampleMonths[3]:
                    tempData[3] ++;
                break;

                case sampleMonths[4]:
                    tempData[4] ++;
                break;

                case sampleMonths[5]:
                    tempData[5] ++;
                break;

                case sampleMonths[6]:
                    tempData[6] ++;
                break;

                case sampleMonths[7]:
                    tempData[7] ++;
                break;

                case sampleMonths[8]:
                    tempData[8] ++;
                break;

                case sampleMonths[9]:
                    tempData[9] ++;
                break;
                
                case sampleMonths[10]:
                    tempData[10] ++;
                break;

                case sampleMonths[11]:
                    tempData[11] ++;
                break;
            
                default:
                    console.log('out of range.')
                    break;
            }
        });
        return tempData
    }

    function getDoneTasksInMonths(){
        const tempDoneTasks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const DTIM = taskList.filter(task => task.year == currentYear && task.done === true).map(task => task.month);
        DTIM.forEach((taskMonth) => {
            switch (taskMonth) {
                case sampleMonths[0]:
                    tempDoneTasks[0] ++;
                break;

                case sampleMonths[1]:
                    tempDoneTasks[1] ++;
                break;

                case sampleMonths[2]:
                    tempDoneTasks[2] ++;
                break;

                case sampleMonths[3]:
                    tempDoneTasks[3] ++;
                break;

                case sampleMonths[4]:
                    tempDoneTasks[4] ++;
                break;

                case sampleMonths[5]:
                    tempDoneTasks[5] ++;
                break;

                case sampleMonths[6]:
                    tempDoneTasks[6] ++;
                break;

                case sampleMonths[7]:
                    tempDoneTasks[7] ++;
                break;

                case sampleMonths[8]:
                    tempDoneTasks[8] ++;
                break;

                case sampleMonths[9]:
                    tempDoneTasks[9] ++;
                break;
                
                case sampleMonths[10]:
                    tempDoneTasks[10] ++;
                break;

                case sampleMonths[11]:
                    tempDoneTasks[11] ++;
                break;
            
                default:
                    console.log('out of range.')
                    break;
            }
        });
        return tempDoneTasks
    }
    useEffect(()=>{
        setChartData1(getAllTasksInMonths());
        setChartData2(getDoneTasksInMonths());

    }, [taskList]);


    useEffect(()=>{
        setLoading(true);
        setLoading(false);
    }, [chartData1])

    // TASK CREATED IN 
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Task Created in Months',
            },
        },
        maintainAspectRatio:false
        };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August", "September", "October", "November", "December" ];

    // const numbers = Object.values(taskCreatedInMonthsData);
    //     console.log(numbers)
    const data = {
        labels,
        datasets: [
            {
                label: `All Tasks`,
                data: chartData1,
                backgroundColor: darkMode ? '#FFF' : '#2C3639',
            },
            {
                label: `Finished Tasks`,
                data: chartData2,
                backgroundColor: darkMode ? '#FFF' : '#2C3639',
            }
        ],
        };

    return (
        <div style={{height:'20rem'}}>
        {chartData1[5]}

            {!loading &&
                <Bar options={options} data={data} />
                }
        </div>
    )
}
