import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import classes from "./TaskGrid.module.css";
import { useTheme } from '@mui/material/styles';

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


export default function TaskGrid(props){
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
    const rows = props.data.filter(task => task.done == false && task.smilliseconds > startOfDayInMili).map(task => ({
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
            // Mark as Done!
            console.log('wanna mark as done!')
            props.onCheck(e);
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
        <section className={darkMode ? classes.darkPanel : classes.lightPanel}>
            <h3 className={classes.title}>Today</h3>

            <div style={{ height: 371 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    // onSelectionModelChange={(e) => props.onCheck(e)}
                    onSelectionModelChange={checkedTasksHandler}
                />
            </div>
                
                {/* CORRECT WAY TO CONDITIONALLY APPLY INLINE STYLES */}
                {/* https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react */}
            <div className={classes.modeToggle} style={deleteMode ? {color: "red"} : {}}>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked onChange={handleModeSwitch} checked={deleteMode} color="error" />} label={modeLabel} />
                </FormGroup>
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
        </section>
    )
}