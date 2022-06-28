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


export default function C1(props) {
    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(true);
    const [chartData1, setChartData1] = useState([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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

    const a = taskList.filter(task => task.year == currentYear).map(task => task.month);
    console.log(a);

    useEffect(()=>{
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].year == currentYear){
                
                
                switch (taskList[i].month) {
                    case sampleMonths[0]:
                        
                        // setChartData1(prev => ({...prev, jan: prev.jan + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, jan: prev.jan + 1}))
                    break;
                    case sampleMonths[1]:
                        // setChartData1(prev => ({...prev, feb: prev.feb + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, feb: prev.feb + 1}))
                    break;
                    case sampleMonths[2]:
                        // setChartData1(prev => ({...prev, mar: prev.mar + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, mar: prev.mar + 1}))
                    break;
                    case sampleMonths[3]:
                        // setChartData1(prev => ({...prev, apr: prev.apr + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, apr: prev.apr + 1}))
                    break;
                    case sampleMonths[4]:
                        // setChartData1(prev => ({...prev, may: prev.may + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, may: prev.may + 1}))
                    break;
                    case sampleMonths[5]:
                        setChartData1(prev => {
                            const newArray = prev;
                            newArray[5] = prev[5] + 1;
                            return newArray;
                        })
                        // setChartData1(prev =>{ return {...prev, jun: prev.jun + 1}});
                        // if (taskList[i].done) setChartData2(prev => {return {...prev, jun: prev.jun + 1}})
                    break;
                    case sampleMonths[6]:
                        // setChartData1(prev => ({...prev, jul: prev.jul + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, jul: prev.jul + 1}))
                    break;
                    case sampleMonths[7]:
                        // setChartData1(prev => ({...prev, aug: prev.aug + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, aug: prev.aug + 1}))
                    break;
                    case sampleMonths[8]:
                        // setChartData1(prev => ({...prev, sep: prev.sep + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, sep: prev.sep + 1}))
                    break;
                    case sampleMonths[9]:
                        // setChartData1(prev => ({...prev, oct: prev.oct + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, oct: prev.oct + 1}))
                    break;
                    case sampleMonths[10]:
                        // setChartData1(prev => ({...prev, nov: prev.nov + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, nov: prev.nov + 1}))
                    break;
                    case sampleMonths[11]:
                        // setChartData1(prev => ({...prev, dec: prev.dec + 1}))
                        // if (taskList[i].done) setChartData2(prev => ({...prev, dec: prev.dec + 1}))
                    break;
                
                    default:
                        console.log('out of range.')
                        break;
                }
            }
        }
    // setChartData(Object.values(taskCreatedInMonthsData));
    // setChartData(() => {
    //     Object.values(taskCreatedInMonthsData)[0]
    // });
    // setChartData1(Object.values(taskCreatedInMonthsData).map((entry => entry[0])));
    // setChartData2(Object.values(taskCreatedInMonthsData).map((entry => entry[1])));
    // setLoading(false);
    // setChartData1(jsObject => Object.values(jsObject))
    console.log('gg')
    console.log(chartData1);
    // setLoading(true);
    // setChartData2(jsObject => Object.values(jsObject))
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
                backgroundColor: '#2C3639',
            },
            {
                label: `Finished Tasks`,
                data: chartData2,
                backgroundColor: '#FFF',
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
