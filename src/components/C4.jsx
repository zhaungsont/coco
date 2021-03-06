import React, { useEffect, useState } from 'react'
import classes from "./C4.module.css"

import { useTheme } from '@mui/material/styles';

import Tooltip from '@mui/material/Tooltip';


export default function C4(props) {

        const [clearInWeek, setClearInWeek] = useState('');
        const [clearInHis, setClearInHis] = useState('');
        const [streak, setStreak] = useState('');
        const [avgTime, setAvgTime] = useState('');

        const [darkMode, setDarkMode] = useState(false);
        const theme = useTheme().palette.mode;
        useEffect(()=>{
            setDarkMode(theme == 'light' ? false : true);
        }, [theme]);

        const taskList = props.data;
        const sampleDate = new Date();

        function getStartOfDay(year, month, day){
            return new Date(year, month, day);
        }
        const startOfDay = getStartOfDay(
            sampleDate.getFullYear(),
            sampleDate.getMonth(),
            sampleDate.getDate()
        );
        const startOfDayInMili = startOfDay.getTime();
        const weekDay = sampleDate.getDay() === 0 ? 6 : sampleDate.getDay() - 1;
        const dayInMili = 86400000;
        const startOfThisWeekinMili = startOfDayInMili - (weekDay * dayInMili);
        console.log(new Date(startOfThisWeekinMili));

            // firebase data looks like this:
        // name: "123"
        // done: false
        // syear: 2022
        // smonth: 6
        // sday: 23
        // sweekday: "Thursday"
        // shour: 22
        // sminutes: 15
        // sseconds: 19
        // smilliseconds: 5834759834758
        // eyear: 2022
        // emonth: 6
        // eday: 23
        // eweekday: "Thursday"
        // ehour: 22
        // eminutes: 15
        // eseconds: 19
        // emilliseconds: 5834759834758
        // tag: ''
        // id: "wehUWEHfoihwefw" NOTICE!! id is generated in Home.jsx on fetching firebase data.

        function getClearRateInWeek(){
            if (taskList.length > 0){
            const allTasks = taskList.filter(t => t.smilliseconds > startOfThisWeekinMili).length;
            const doneTasks = taskList.filter(t => t.emilliseconds > startOfThisWeekinMili).length;
            // console.log(allTasks)
            // console.log(doneTasks)
            const percentage = Math.round(1000 * doneTasks / allTasks) / 10;
            setClearInWeek(percentage);
            } else {
                setClearInWeek("0");
            }
        }

        function getClearRateinHistory(){
            if (taskList.length > 0){
            const allTasks = taskList.length;
            const doneTasks = taskList.filter(t => t.done === true).length;
            const percentage = Math.round(1000 * doneTasks / allTasks) / 10;
            setClearInHis(percentage);
            } else {
                setClearInHis("0");
            }
        }

        function getTaskStreaks(){
            // use startOfDayInMili to check if there are tasks that are done && older than this date
            // if so, increment streak number and go to the previous date, until it's false
            let streak = 0;
            for (let i=0; i< taskList.length; i++){
                // const time = taskList[i].emilliseconds;
                // if (taskList[i].emilliseconds > startOfDayInMili - (i * dayInMili) && )
                if (taskList.filter(t => t.emilliseconds > startOfDayInMili - (i * dayInMili) && t.emilliseconds < startOfDayInMili - ((i - 1) * dayInMili)).length > 0){
                    streak ++;
                    console.log('gg');
                } else {
                    break;
                }
            }
            setStreak(streak)
        }

        function getAvgTime(){
            if (taskList.length > 0){
                const doneTasks = taskList.filter(t => t.done);
                if (doneTasks.length > 0){
                    const timeArray = [];
                    console.log(timeArray)
                    doneTasks.forEach(t => timeArray.push(t.emilliseconds - t.smilliseconds));
                    const average = (timeArray.reduce((p, c) => p + c, 0) / timeArray.length / 60000).toString().slice(0, 4);
                    setAvgTime(average);
                    console.log(average);
                } else {
                    setAvgTime('0');
                }
            } else {
                setAvgTime('0');
            }
        }

    useEffect(()=>{
        // Call functions...
        getClearRateInWeek();
        getClearRateinHistory();
        getTaskStreaks();
        getAvgTime();
    }, [taskList])

    return (
        <div style={{marginBottom: "1rem"}} className={`${classes.C4Grid} ${darkMode ? `${classes.darkPanel}` : `${classes.lightPanel}` } `}>
            <div className={classes.wrapper}>
                <p className={classes.description}>Task Completion This Week</p>
                <p className={classes.metric}>{clearInWeek}<span>%</span></p>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.description}>All Time Task Completion</p>
                <p className={classes.metric}>{clearInHis}<span>%</span></p>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.description}>Task Streak in Days</p>
                <p className={classes.metric}>{streak}<span>d</span></p>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.description}>Average Time Spent per Task</p>
                <p className={classes.metric}>{avgTime}<span>m</span></p>
            </div>
        </div>
    )
}
