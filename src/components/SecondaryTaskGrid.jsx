import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function SecondaryTaskGrid(props){
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
        { field: 'taskName', headerName: 'Tasks', width: 150 },
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
    const filterMethod = props.method;
    const [rows, setRows] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const sampleDate = new Date()
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
            console.log('debug')
            console.log(props.data[0])
            setRows(props.data.filter(task => task.done == true && task.milliseconds > startOfDayInMili).map(task => ({
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
                    category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'week'){
            setRows(props.data.filter(task => task.done == true && task.milliseconds > sevenDaysAgo).map(task => ({
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
                category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'month'){
            setRows(props.data.filter(task => task.done == true && task.milliseconds > startOfMonthInMili).map(task => ({
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
                category: task.tag ? task.tag : 'No Category'})))
        } else if (filterMethod == 'all time'){
            setRows(props.data.filter(task => task.done == true).map(task => ({
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
    


    return(
        <>
            {rows ? 
            <div style={{ height: 500 }}>
            <DataGrid

                loading={isLoading}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(e) => props.onAddBack(e)}
            />
        </div>
        :
       <span>loading...</span>
            }
        </>
    )
}