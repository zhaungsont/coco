import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import classes from "./UndoneTasks.module.css";

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// Firebase
import Firebase, {auth, database} from "../Firebase";
import { ref, set, push, onValue, update } from "firebase/database";

import { useAuth } from "../contexts/AuthContext";

export default function UndoneTasks(props) {
    const { currentUser } = useAuth();
    const [show, setShow] = useState(false);
    const [expand, setExpand] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [moveTask, setMoveTask] = useState([]);
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

    const sampleDate = new Date();

    function getStartOfDay(year, month, day){
        return new Date(year, month, day);
    }
    const startOfDay = getStartOfDay(
        sampleDate.getFullYear(),
        sampleDate.getMonth(),
        sampleDate.getDate()
    )
    const startOfDayInMili = startOfDay.getTime();
    console.log(startOfDayInMili);

    // Get undone TaskList
    useEffect(()=>{
        const tempList = props.data.filter(t => t.smilliseconds < startOfDayInMili && t.done === false);
        
        setTaskList(tempList);
        // console.log(taskList)
        // console.log(taskList.length);

        // check is there are any undone tasks at all
        if (tempList.length !== 0){
            setTimeout(() => {
                setShow(true);
                setTimeout(()=>{
                    setExpand(true);
                }, 100)
            }, 300);
        } else {
            setShow(false);
        } 
    }, [props.data]);


    function onAddToToday(t){
        console.log(t);
    }

    function openCloseHandler(){
        setExpand(!expand);
    }

    const columns = [
        // { field: 'id', headerName: '#', width: 80 },
        { field: 'taskName', headerName: 'Tasks', witdth: 100, minWidth: 300 },
        { field: 'category', headerName: 'Category', width: 120 },
        { field: 'date', headerName: 'Date Created', width: 500 },
        // { 
        //     field: 'created', 
        //     headerName: 'Date Created', 
        //     width: 500, 
        //     valueGetter: (params) =>`
        //     ${params.row.hour || ''}:${params.row.minutes || ''}:${params.row.seconds || ''}; 
        //     ${params.row.weekday || ''}, ${params.row.day || ''}, ${params.row.month || ''} ${params.row.year || ''}
        //     `
        // },

    ];
    const rows = taskList.map(task => ({
        key: task.id, 
        id: task.id, 
        taskName: task.name, 
        date: new Date(task.smilliseconds),
        year: task.year, 
        month: task.month, 
        day: task.day, 
        weekday: task.weekday, 
        hour: task.hour, 
        minutes: task.minutes, 
        seconds: task.seconds, 
        category: task.tag ? task.tag : 'No Category'}));


    return(
        <>
        {show && 
        
        <div className={classes.undoneTasks} style={{border: "1px solid #F9F2ED"}}>
            <div className={classes.title}>
                <strong>Undone Tasks</strong>
                <IconButton size="small" onClick={openCloseHandler}>
                    {expand ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </IconButton>
            </div>
            <Collapse in={expand}>
                <div style={{ height: 290 }} className={classes.taskGrid}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        checkboxSelection
                        onSelectionModelChange={(e) => onAddToToday(e)}
                    />
                </div>
            </Collapse>
                </div>

        }
        </>
    )
}
