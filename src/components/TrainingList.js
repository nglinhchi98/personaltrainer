import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import dayjs from 'dayjs';
import { Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function TrainingList() {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTraining()},[]);

    //ag grid 
    const[columnDefs]=useState([
        {field:'date',valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),
         headerName: 'Date',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'duration',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'activity',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'customer.firstname',headerName: 'First Name',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'customer.lastname',headerName: 'Last Name',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {cellRenderer: params=>
            <Button 
                color='error'
                onClick={()=> deleteTraining(params)}
            >
               <DeleteIcon size={1}/>
                </Button>
                , width:80, filtering:false,sortable:false},
    ])
    

    //get all trainings

    const getTraining = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Something went wrong in GET request'); 
        })
        
        .then(data => setTraining(data))
        .catch(err => console.error(err))
        }

        // delete training
    const deleteTraining = (params) => {
        if (window.confirm('Are you sure to delete this training?')) {
            fetch('http://traineeapp.azurewebsites.net/api/trainings/' + params.data.id, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setOpen(true);
                    getTraining();
                }
                else {
                    alert('Something went wrong, try again.')
                }
            })
            .catch(err => console.error(err))
        }
    }



    return (
        <>
            <div
                className='ag-theme-material'
                style={{ width: '80%', height: 600, margin: 'auto'}}>
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
            <Snackbar
                open={open}
                message="Training deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                />
        </>
    )
}
export default TrainingList;
