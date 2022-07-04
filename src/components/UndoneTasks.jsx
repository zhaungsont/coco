import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import classes from "./UndoneTasks.module.css";

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

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

export default function UndoneTasks(props) {
    const [deleteMode, setDeleteMode] = useState(false);
    const [modeLabel, setModeLabel] = useState('Marking as Done')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteTask, setDeleteTask] = useState([]);

    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);
    
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

    useEffect(()=>{
        
        const cleaner = setTimeout(() => {

            const date = new Date();
            const milliseconds = date.getTime()

            const renewInfo = {
                smilliseconds: milliseconds,
                done: false
            };

            moveTask.map(task => { update(ref(database, `tasks/${currentUser.uid}/${task}`), renewInfo) })
        }, 500);
        
        return (()=>{clearInterval(cleaner)})
    }, [moveTask])

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

    
        function handleModeSwitch(e){
            setDeleteMode(!deleteMode);
            console.log(e.target.checked);
        }
    
        function checkedTasksHandler(e){
            if (deleteMode === false){
                // Add to today's tasklist!
                console.log("adding to today's task!")
                setMoveTask(e);
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
            // border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
        };

    return(
        <>
        {show && <>
        
        <div className={darkMode ? classes.darkPanel : classes.lightPanel}>
            <div className={classes.title} onClick={openCloseHandler}>
                <strong>Undone Tasks</strong>
                <IconButton size="small">
                    {expand ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </IconButton>
            </div>
            <Collapse in={expand}>
            <p>It seems like you have some unfinished tasks from before. Check on them to add them to your to-dos today!</p>
                <div style={{ height: 290 }} className={classes.taskGrid}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        checkboxSelection
                        // onSelectionModelChange={(e) => setMoveTask(e)}
                        onSelectionModelChange={checkedTasksHandler}
                    />
                </div>
                <div className={classes.modeToggle} style={deleteMode ? {color: "red"} : {}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked onChange={handleModeSwitch} checked={deleteMode} color="error" />} label={modeLabel} />
                    </FormGroup>
                </div>
            </Collapse>
                </div>

                <Modal
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
                </Modal>
            </>
        }
        </>
    )
}
