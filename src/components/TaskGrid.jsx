import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function TaskGrid(props){
    let loadingData = false;

    // firebase data looks like this:
    // name: "123"
    // year: 2022
    // month: 6
    // day: 23
    // weekday: "Thursday"
    // done: false
    // hour: 22
    // minutes: 15
    // seconds: 19
    // milliseconds: 5834759834758
    // tag: ''
    // id: "wehUWEHfoihwefw" NOTICE!! id is generated in Home.jsx on fetching firebase data.

    const columns = [
        // { field: 'id', headerName: '#', width: 80 },
        { field: 'taskName', headerName: 'Tasks', witdth: 100, minWidth: 200 },
        { field: 'category', headerName: 'Category', width: 120 },
        { field: 'date', headerName: 'Date Created', width: 500 },
        { 
            field: 'created', 
            headerName: 'Date Created', 
            width: 500, 
            valueGetter: (params) =>`
            ${params.row.hour || ''}:${params.row.minutes || ''}:${params.row.seconds || ''}; 
            ${params.row.weekday || ''}, ${params.row.day || ''}, ${params.row.month || ''} ${params.row.year || ''}
            `
        },

    ];
    const rows = props.data.filter(task => task.done == false).map(task => ({
        key: task.id, 
        id: task.id, 
        taskName: task.name, 
        date: new Date(task.milliseconds),
        year: task.year, 
        month: task.month, 
        day: task.day, 
        weekday: task.weekday, 
        hour: task.hour, 
        minutes: task.minutes, 
        seconds: task.seconds, 
        category: task.tag ? task.tag : 'No Category'}));

    return(
        <div style={{ height: 371 }}>
            <DataGrid
                loading={loadingData}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(e) => props.onCheck(e)}
            />
        </div>
    )
}