import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Icon from '@mdi/react';
import { mdiNotePlusOutline } from '@mdi/js';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [done, setDone] = React.useState(false);


    //target customer to add training to profile
    const [customer, setCustomer] = React.useState({firstname:'', lastname:''});
    const [customerLink, setCustomerLink] = React.useState('');

    //new training to be added 
    const [training, setTraining] = React.useState({
        date:'',
        duration:'0',
        activity: '',
        customer:''
    });


    const handleClickOpen = () => {
        setOpen(true);

    //customer name for the input field
    setCustomer({
        firstname:props.params.firstname,
        lastname:props.params.lastname,
    });

    //customer link in order to connect training with customer
    const url = props.params.links[0].href
    let customerID="";
    for(let i = url.length -1; i>=0; i--){
        if (/\d/.test(url[i])) {
            customerID = url[i] + customerID;
          } else {
            break;
          }}
    setCustomerLink('http://traineeapp.azurewebsites.net/api/customers/' + customerID);
    setDone(true);
    };

    if(done){
        setTraining({...training, customer:customerLink})
        setDone(false)
    };

    const handleClose = () => {
        setOpen(false);
    }

    //set the date for training
    const changeDate = (date) => {
        setTraining({...training, date:date})
    }

    //saving new training 
    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }


    return (
        <div>
            <Button  
                color='primary' 
                onClick={handleClickOpen}>
                <Icon 
                path={mdiNotePlusOutline} 
                size={1} 
                />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <TextField 
                        InputProps={{disabled:true,}}
                        value={customer.firstname + " " + customer.lastname}
                        margin="dense"
                        label="Customer name"
                        name="customer"
                        fullWidth
                        variant="standard"
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                            label= "Date"
                            name='date'
                            value={training.date}
                            onChange={date => changeDate(date)}></DatePicker>
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                        margin="dense"
                        label="Training"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}