import React, { useState } from "react";
import classes from './AddTask.module.css';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Autocomplete from '@mui/material/Autocomplete';


// Trying Bootstrap React
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function AddTask(props){
    const width = window.innerWidth;

    const category = [
        { label: 'Programming', title: 'programming' },
        { label: 'House Chores', title: "chores" },
        { label: 'Study', title: "study" },
    ];

    function submitHandler(e){
        e.preventDefault();
        console.log('Submission Request from AddTask.jsx');
        console.log(e.target.value);
        props.onSubmit();
    }

    return(
        <div className={classes.inputField}>
        <Form onSubmit={submitHandler}>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Add something..."
                aria-label="Add something."
                aria-describedby="add-task-btn"
                size={width < 480 && "md"}
                onChange={props.onChange}
                value={props.inputValue}
                />
                <Button onClick={submitHandler} variant="outline-secondary" id="add-task-btn">
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