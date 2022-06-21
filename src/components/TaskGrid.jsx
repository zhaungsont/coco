import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function TaskGrid(props){

    const columns = [
        { field: 'id', headerName: '#', width: 80 },
        { field: 'taskName', headerName: 'Tasks', width: 200 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'created', headerName: 'Date Created', width: 500 },

      ];
    const rows = props.data.map(task => ({key: task.id, id: task.id, taskName: task.name, created: task.date, category: task.category ? task.category : 'No Category'}));

    //  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    return(
        <div style={{ height: 400, width: '95%', margin: "auto 1rem" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(e) => props.onCheck(e)}
            />
        </div>
    )
}