import React, { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({ firstname: '', lastname: '' });
  const [customerLink, setCustomerLink] = useState('');
  const [training, setTraining] = useState({
    date: '',
    duration: '0',
    activity: '',
    customer: ''
  });

  useEffect(() => {
    if (customerLink) {
      setTraining((prevTraining) => ({ ...prevTraining, customer: customerLink }));
    }
  }, [customerLink]);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: props.params.firstname,
      lastname: props.params.lastname
    });

    const url = props.params.links[0].href;
    let customerID = '';
    for (let i = url.length - 1; i >= 0; i--) {
      if (/\d/.test(url[i])) {
        customerID = url[i] + customerID;
      } else {
        break;
      }
    }
    setCustomerLink('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers' + customerID);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeDate = (date) => {
    setTraining((prevTraining) => ({ ...prevTraining, date }));
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <Icon path={mdiNotePlusOutline} size={1} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            InputProps={{ disabled: true }}
            value={customer.firstname + ' ' + customer.lastname}
            margin="dense"
            label="Customer name"
            name="customer"
            fullWidth
            variant="standard"
          />

          <TextField
            value={training.activity}
            onChange={(e) => setTraining((prevTraining) => ({ ...prevTraining, activity: e.target.value }))}
            margin="dense"
            label="Training"
            fullWidth
            variant="standard"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Date" name="date" value={training.date} onChange={changeDate} />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            value={training.duration}
            onChange={(e) => setTraining((prevTraining) => ({ ...prevTraining, duration: e.target.value }))}
            margin="dense"
            label="Duration (minutes)"
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
