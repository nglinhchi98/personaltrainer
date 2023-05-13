import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { API_URL } from '../constants';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './updateCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import AddTraining from './AddTraining';
//for csv export
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState();

    useEffect(() => {
        getCustomers()}, [])

    //ag grid columns
    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, headerName:'First Name'},
        {field: 'lastname', sortable: true, filter: true, headerName:'Last Name'},
        {field: 'streetaddress', sortable: true, filter: true, headerName: 'Address'},
        {field: 'postcode', sortable: true, filter: true, headerName: 'Postcode'},
        {field: 'city', sortable: true, filter: true, headerName: 'City'},
        {field: 'email', sortable: true, filter: true, headerName: 'Email'},
        {field: 'phone', sortable: true, filter: true, headerName: 'Phone'},
        {cellRenderer: params => 
            <AddTraining 
            saveTraining={saveTraining} 
            params= {params.data} />,
            width: 80, 
            filter: false,
            sortable: false
        },
        {cellRenderer: params => 
            <EditCustomer 
            updateCustomer = {updateCustomer}
            params= {params.data} />
            ,width: 80, 
            filter: false,
            sortable: false},
        {cellRenderer: params => 
        <Button 
            size='small'
            color='error'
            onClick={() => deleteCustomer(params)}>
            <DeleteIcon size={1} />
            </Button>, 
            width: 80,
            filter: false,
            sortable: false},
    ])

    //get data from api for the table
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
        //delete a customer, find and delete by customer's unique id
    const deleteCustomer = (params) => {
        const url = params.data.links[0].href
            let customerID = ""
            for (let i = url.length -1; i >=0; i--) {
                if(/\d/.test(url[i])) {
                    customerID = url[i] + customerID;
                } else {break;}
            }

        if (window.confirm('Are you sure to delete this customer?')) {
          fetch(API_URL + "api/customers/" + customerID, { method:'DELETE'})
            .then(response => {
              if (response.ok) {
                setOpen(true);
                getCustomers();
              } else {
                alert('Something went wrong, try again.');
              }
            })
            .catch(err => console.error(err));
        }
      };
      
    //add new customer
    const addCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(res=> getCustomers())
        .catch(err => console.error(err))
    }


      //update existing customer
    const updateCustomer = (customer, link) => {
        const url = link
            let customerID = ""
            for (let i = url.length -1; i >=0; i--) {
                if(/\d/.test(url[i])) {
                    customerID = url[i] + customerID;
                } else {break;}
            }
        fetch('https://traineeapp.azurewebsites.net/api/customers/' + customerID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(customer)
        })
        .then(res=> getCustomers())
        .catch(err=> console.error(err))
      }

      //adding new training 
      const saveTraining=(training)=>{
        fetch('https://traineeapp.azurewebsites.net/api/trainings',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(training)
        }
        )
        .then(res=> getCustomers())
        .catch(err=>console.error(err))
    }
      
      //download as csv file 
    function clickToExport() {
        gridRef.current.api.exportDataAsCsv();
    }
    const gridRef = useRef();

    return (
        <>
            <h2 style={{marginTop: 30}}>Customer List</h2>
            <div style={{ display: 'flex'}}>
                <AddCustomer addCustomer={addCustomer} />
                <Button 
                    variant="contained" 
                    color='primary'
                    style={{
                        margin:13.5,
                        marginLeft: 0,
                        padding:8,
                        fontSize: '12px'}}
                    onClick= {() => clickToExport()}
                    >
                    <GetAppIcon />CSV
                </Button>
            </div>
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
                    ref={gridRef}
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
