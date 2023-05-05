import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { API_URL } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { SettingsPowerRounded } from '@mui/icons-material';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {cellRenderer: params => 
        <Button 
            size='small'
            color='error'
            onClick={() => deleteCustomer(params)}>
            Delete
            </Button>, width: 120}
    ])

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure to delete this customer?')) {
            fetch(params.data.links.customers.href, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    SettingsPowerRounded(true);
                    getCustomers();
                }
                else {
                    alert('Something went wrong, try again.')
                }
            })
            .catch(err => console.error(err))
        }
    }

    const getCustomers = () => {
    fetch(API_URL + 'api/customers')
    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert('Something went wrong in GET request'); 
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch(API_URL + 'customers', {
            method:'POST',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
                alert('Something went wrong in addition: ' + response.statusText)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <>
            <div
                className='ag-theme-material'
                style={{ width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    rowSelection='single'
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    defaultColDef={{filter:true}}
                    />
            </div>
            
            <Snackbar
                open={open}
                message="Customer deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                />
                   
        </>
    )
}
export default CustomerList;
