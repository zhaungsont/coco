import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import classes from "./SecondaryTaskGrid.module.css";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';

// Firebase
import Firebase, {auth, database} from "../Firebase";
import { ref, set, push, onValue, update, remove } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

import { useTheme } from '@mui/material/styles';

export default function SecondaryTaskGrid(props){
    const [deleteMode, setDeleteMode] = useState(false);
    const [modeLabel, setModeLabel] = useState('Marking as Done')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteTask, setDeleteTask] = useState([]);

    const { currentUser } = useAuth();

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

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

    const columns = [
        // { field: 'id', headerName: '#', width: 80 },
        { field: 'taskName', headerName: 'Tasks', width: 150 },
        { field: 'category', headerName: 'Category', width: 120 },
        { field: 'date', headerName: 'Date Finished', width: 500 },
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
    const filterMethod = props.method;
    const [rows, setRows] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const sampleDate = new Date();
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }
    const firstDayCurrentMonth = getFirstDayOfMonth(
        sampleDate.getFullYear(),
        sampleDate.getMonth(),
    );
    
    function getStartOfDay(year, month, day){
        return new Date(year, month, day);
    }
    const startOfDay = getStartOfDay(
        sampleDate.getFullYear(),
        sampleDate.getMonth(),
        sampleDate.getDate()
    )
    const startOfDayInMili = startOfDay.getTime();
    

    const startOfMonth = new Date(firstDayCurrentMonth);
    const startOfMonthInMili = startOfMonth.getTime();
    console.log(new Date(startOfMonthInMili));

    const sevenDaysAgo = new Date(sampleDate.getTime() - 604800000);
    console.log(sevenDaysAgo)




    useEffect(()=>{
        if (filterMethod == 'done today'){
            // I HAVEN'T LIMIT THIS DATA TO ONLY TODAY!!!
            console.log(props.data[0])
            setRows(props.data.filter(task => task.done == true && task.emilliseconds > startOfDayInMili).map(task => ({
                    key: task.id, 
                    id: task.id, 
                    taskName: task.name, 
                    date: new Date(task.emilliseconds),
                    year: task.year, 
                    month: task.month, 
                    day: task.day, 
                    weekday: task.weekday, 
                    hour: task.hour, 
                    minutes: task.minutes, 
                    seconds: task.seconds, 
                    category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'week'){
            setRows(props.data.filter(task => task.done == true && task.emilliseconds > sevenDaysAgo).map(task => ({
                key: task.id, 
                id: task.id, 
                taskName: task.name, 
                date: new Date(task.emilliseconds),
                year: task.year, 
                month: task.month, 
                day: task.day, 
                weekday: task.weekday, 
                hour: task.hour, 
                minutes: task.minutes, 
                seconds: task.seconds, 
                category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'month'){
            setRows(props.data.filter(task => task.done == true && task.emilliseconds > startOfMonthInMili).map(task => ({
                key: task.id, 
                id: task.id, 
                taskName: task.name, 
                date: new Date(task.emilliseconds),
                year: task.year, 
                month: task.month, 
                day: task.day, 
                weekday: task.weekday, 
                hour: task.hour, 
                minutes: task.minutes, 
                seconds: task.seconds, 
                category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'all time'){
            setRows(props.data.filter(task => task.done == true).map(task => ({
                key: task.id, 
                id: task.id, 
                taskName: task.name, 
                date: new Date(task.emilliseconds),
                year: task.year, 
                month: task.month, 
                day: task.day, 
                weekday: task.weekday, 
                hour: task.hour, 
                minutes: task.minutes, 
                seconds: task.seconds, 
                category: task.tag ? task.tag : 'No Category'})))
        }
        setIsLoading(false);
    }, [props.dependency])
    // const rows = props.data.filter(task => task.done == false).map(task => ({
    //     key: task.id, 
    //     id: task.id, 
    //     taskName: task.name, 
    //     date: new Date(task.milliseconds),
    //     year: task.year, 
    //     month: task.month, 
    //     day: task.day, 
    //     weekday: task.weekday, 
    //     hour: task.hour, 
    //     minutes: task.minutes, 
    //     seconds: task.seconds, 
    //     category: task.tag ? task.tag : 'No Category'}));

    // GET THE TIME OF START OF MONTH IN MILISECONDS 
    // https://bobbyhadz.com/blog/javascript-get-first-day-of-month#:~:text=To%20get%20the%20first%20day,first%20day%20of%20the%20month.
    
    function handleModeSwitch(e){
        setDeleteMode(!deleteMode);
        console.log(e.target.checked);
    }
    function checkedTasksHandler(e){
        if (deleteMode === false){
            // Add tasks back to today!
            console.log('wanna mark as undone!')
            props.onAddBack(e);
        } else {
            // Initiate Deletion!!
            setDeleteTask(e);
        }
    }

    // Cleanup function and permission to delete
    useEffect(()=>{
        const cleaner = setTimeout(() => {
            if (deleteTask.length > 0){
                // ask for permission to delete
                console.log('can I delete?')
                setModalIsOpen(true);
            }

        }, 500);
        return () => clearTimeout(cleaner);
    }, [deleteTask])

    //  Actually delete in firebase
    function DeleteTasks(){
        console.log('will delete!!!')
        console.log(deleteTask);
        deleteTask.forEach(taskId=>{
            remove(ref(database, `tasks/${currentUser.uid}/${taskId}`));
        })
        setModalIsOpen(false);
    }

    // Handle the label text
    useEffect(()=>{
        if (deleteMode){
            setModeLabel('DELETE MODE')
        } else {
            setModeLabel('Marking as Done')
        }
    }, [deleteMode]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <>
            {rows ? 
            <>
            <div style={{ height: 600 }} className={darkMode ? classes.darkPanel : classes.lightPanel}>
                <DataGrid

                    loading={isLoading}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    // onSelectionModelChange={(e) => props.onAddBack(e)}
                    onSelectionModelChange={checkedTasksHandler}
                />
                {/* <div className={classes.modeToggle} style={deleteMode ? {color: "red"} : {}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked onChange={handleModeSwitch} checked={deleteMode} color="error" />} label={modeLabel} />
                    </FormGroup>
                </div> */}
                

            </div>
            </>
            :
            <span>loading...</span>
            }
        
            {/* <Modal
            open={modalIsOpen}
            onClose={()=>setModalIsOpen(false)}
            aria-labelledby="Deletion Warning"
            aria-describedby="Deletion Warning Modal"
            >
                <Box sx={style}>
                <Typography id="warning" variant="h6" component="h2">
                    Are You Sure?
                </Typography>
                <Typography id="warning description" sx={{ mt: 2 }}>
                    You are about to delete {deleteTask.length} item(s) forever. This action cannot be undone.
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{mt: 3}}>
                        <Button variant="contained" size="small" startIcon={<CancelIcon />} onClick={() => setModalIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="outlined" size="small" color="error" onClick={DeleteTasks} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Stack>
                </Typography>
                </Box>
            </Modal> */}
        </>
    )
}