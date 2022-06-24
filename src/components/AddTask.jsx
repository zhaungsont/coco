import React, { useState, useEffect } from "react";
import classes from './AddTask.module.css';
import { useTheme } from '@mui/material/styles';


// Firebase
import Firebase, {database} from "../Firebase";
import { ref, set } from "firebase/database";

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Autocomplete from '@mui/material/Autocomplete';


// Bootstrap React
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function AddTask(props){
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme().palette.mode;
    useEffect(()=>{
        setDarkMode(theme == 'light' ? false : true);
    }, [theme]);

    const width = window.innerWidth;

    const category = [
        { label: 'Programming', title: 'programming' },
        { label: 'House Chores', title: "chores" },
        { label: 'Study', title: "study" },
    ];

    function submitHandler(e){
        e.preventDefault();
        console.log('Submission Request from AddTask.jsx');

        // push new task to firebase
        // const newTask = {
        //     title: e.target.value,
        //     done: 0
        // }
        // set(ref(database, '1'), newTask);
        props.onSubmit();


        // const taskRef = Firebase.database().ref('Task');
        // taskRef.push(newTask);
    }

    return(
        <div className={classes.inputField}>
        <Form onSubmit={submitHandler}>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Add something..."
                aria-label="Add something."
                aria-describedby="add-task-btn"
                size={width < 480 && "lg"}
                // onChange={props.onChange}
                // value={props.inputValue}
                ref={props.inputValue}
                />
                <div style={{width: width < 480 ? "6rem" : "5rem"}}>
                    <Form.Select aria-label="Category" size={width < 480 && "lg"}>
                        <option value="" >Tag</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </div>

                <Button onClick={submitHandler} variant={darkMode ? "outline-light" : "outline-secondary"} id="add-task-btn">
                    Add
                </Button>
            </InputGroup>
        </Form>

            {/* <Stack 
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={-1}
            > */}
                {/* <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: "1rem", width: '25rem'},
                }}
                noValidate
                autoComplete="off"
                > */}
                {/* <TextField
                sx={{ width: {md: "90%", xs: "100%"}}}
                size="small"
                onKeyDown={submitHandler}
                id=""
                label="What's on your mind..."
                variant="filled"
                value={props.inputValue}
                onChange={(e) => props.onChange(e.target.value)}
                /> */}

                {/* </Box> */}
                {/* <span className={classes.btnSpacer}>&nbsp;</span>
                <Button onClick={submitHandler} variant="contained" size="large" scolor="info">Add</Button> */}
            {/* </Stack> */}
            {/* <Autocomplete
            // onChange={(e) => {props.onCatChange(e.target.value)}}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    props.onCatChange({
                    title: newValue,
                });
                } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                    props.onCatChange({
                    title: newValue.inputValue,
                });
                } else {
                    props.onCatChange(newValue);
                }
            }}
            freeSolo
            value={props.categoryValue.title}
            id="combo-box-demo"
            options={category}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} size="small" label="Category" />}
            /> */}
        </div>
    )
}