import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from './AddTask.module.css';
import Autocomplete from '@mui/material/Autocomplete';


export default function AddTask(props){

    const category = [
        { label: 'Programming', title: 'programming' },
        { label: 'House Chores', title: "chores" },
        { label: 'Study', title: "study" },
    ];

    function submitHandler(e){
        // props.onSubmit()
        if (e.key === "Enter" || e.type === "click"){
            e.preventDefault();
            console.log('tryna submit!')
            console.log('task name: ' + props.inputValue);

            props.onSubmit();
        }
    }

    return(
        <div className={classes.inputField}>
            <Stack 
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={-1}
            >
                {/* <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: "1rem", width: '25rem'},
                }}
                noValidate
                autoComplete="off"
                > */}
                <TextField
                sx={{ width: {md: "90%", xs: "100%"}}}
                size="small"
                onKeyDown={submitHandler}
                id=""
                label="What's on your mind..."
                variant="filled"
                value={props.inputValue}
                onChange={(e) => props.onChange(e.target.value)}
                />

                {/* </Box> */}
                <span className={classes.btnSpacer}>&nbsp;</span>
                <Button onClick={submitHandler} variant="contained" size="large" scolor="info">Add</Button>
            </Stack>
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