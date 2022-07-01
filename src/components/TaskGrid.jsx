import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function TaskGrid(props){
    let loadingData = false;

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