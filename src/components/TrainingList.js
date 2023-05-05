import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { API_URL } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from 'date-fns';

function TrainingList() {
    const [training, setTraining] = useState([]);
    const [customer, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {field: 'activity', sortable: true, filter: true, headerName:'Activity'},
        {
        field: 'date', 
        sortable: true, 
        filter: true,
        headerName: 'Date & Time',
        cellRenderer: (params) => {
            const date = format(new Date(params.value), 'dd-MM-yyyy, hh:mm');
            return <span>{date}</span>;}
        },
        {
        field: 'duration', 
        sortable: true, 
        filter: true,
        headerName: 'Duration (minutes)'
        },
        {
        field: 'customer.firstname',
        sortable: true,
        filter: true,
        headerName: 'Customer'
        },
        {
        field: 'customer.id',
        sortable: true,
        filter: true,
        headerName: 'Customer ID'
        }
    ])


    const getTraining = () => {
    fetch(API_URL+'gettrainings')
    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request'); 
    })
    
    .then(data => setTraining(data))
    .catch(err => console.error(err))
    }


    useEffect(() => { 
        getTraining();
    }, [])

    return (
        <>
            <div
                className='ag-theme-material'
                style={{ width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact
                    rowData={training}
                    columnDefs={columnDefs}
                    rowSelection='single'
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    defaultColDef={{filter:true}}
                    />
            </div>
        </>
    )
}
export default TrainingList;
