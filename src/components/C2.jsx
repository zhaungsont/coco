import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from '@mui/material/styles';

import classes from "./chartPanel.module.css";

export default function C2(props) {
    const taskList = props.data;
    
    const { currentUser } = useAuth();
    
    const [darkMode, setDarkMode] = useState(false);

    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const [categories, setCategories] = useState([]);
    const [tasksInTags, setTasksInTags] = useState([])

    function getAllCategories(){
        const tempCatData = [""];
        taskList.forEach((task)=>{
            if (!(tempCatData.includes(task.tag))){ tempCatData.push(task.tag); } 
        });

        const tempData = [];
        for (let i = 0; i < tempCatData.length; i++){
            tempData.push(0);
        }

        taskList.forEach((task)=>{ tempData[tempCatData.indexOf(task.tag)] ++ });

        tempCatData[0] = 'No Category';
        setCategories(tempCatData);
        setTasksInTags(tempData);
    }

    useEffect(()=>{
        getAllCategories();
    }, [taskList]);

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Breakdown of Tasks by Category',
            color: darkMode ? "rgba(240, 235, 227, 1)" : "rgba(44, 54, 57, 1)"
        },
        },
        color: darkMode ? "rgba(240, 235, 227, 1)" : "rgba(44, 54, 57, 1)"
        // maintainAspectRatio:false,
    };

    const data = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: categories,
        datasets: [
            {
            label: '# of Votes',
            data: tasksInTags,
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
            borderWidth: 2,
            },
        ],
        };
        
    return (
        <div style={{padding: "1rem", width: '100%'}} className={darkMode ? `${classes.darkPanel}` : `${classes.lightPanel}`}>
            <Pie options={options} data={data} />
        </div>
    )
}
