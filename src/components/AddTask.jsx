import React, { useState, useEffect, useRef } from "react";
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

    // useEffect(()=>{

    //     const open = props.openNewCat;
    //     console.log(open);
    //     // Generally you should avoid using addEventListener inside React,
    //     // because the state doesn't get updated!
    //     document.addEventListener('keydown', function(event){
    //         if(event.key === "Escape" && open === true){
    //             //do something
    //             console.log('esc!!!')
    //         }
    //     });
    //     console.log(open);
    // }, [props.openNewCat])

    // From The Web Dev
    // https://thewebdev.info/2021/05/24/how-to-listen-for-key-press-for-document-in-react-js/
    const ESCAPE_KEYS = ["27", "Escape"];

    const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
        element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
    };

    const handler = ({ key }) => {
        if (ESCAPE_KEYS.includes(String(key)) && props.openNewCat) {
            console.log("Escape key pressed!");
            props.onCancelWithEsc();
            }
        };
        
        useEventListener("keydown", handler);


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
                <div style={{width: "10rem"}}>
                {props.openNewCat ? 
                
                    <Form.Control
                    placeholder="New Category..."
                    onBlur={props.onCancelNewCatWithBlank}
                    onChange={props.onNewCatFill}
                    autoFocus
                    />
                    
                    :
                    
                    <Form.Select aria-label="Category" size={width < 480 && "lg"} onChange={props.onCatSelectChange} value={props.catSelectValue}>
                        <option value="" >Tag</option>
                        <option value="Academic">Academic</option>
                        <option value="Programming">Programming</option>
                        <option value="Home">Home</option>
                        <option value="!new task!">Create new...</option>
                    </Form.Select>
                
                    }
                    
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