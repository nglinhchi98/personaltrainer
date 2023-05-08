import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiAccountEdit } from '@mdi/js';

export default function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer]= React.useState({
    firstname:'', 
    lastname:'', 
    streetaddress:'', 
    postcode:'', 
    city:'', 
    email:'', 
    phone:''
})

  const handleClickOpen = () => {
    setCustomer({
      firstname:props.params.firstname, 
      lastname:props.params.lastname,
      streetaddress:props.params.streetaddress,
      postcode:props.params.postcode,
      city:props.params.city,
      email:props.params.email,
      phone:props.params.phone
    })
      setOpen(true);
    };
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) =>{
    setCustomer({...customer,
      [event.target.name]:event.target.value
    })
  }

  const updateCustomer = ()=>{
    props.updateCustomer(customer,props.params.links[0].href);
    handleClose();
  }


  return (
    <div>
      <Button onClick={handleClickOpen}>
      <Icon 
          path={mdiAccountEdit} 
          size={1} 
          />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
          />

          <TextField
            name="lastname"
            value={customer.lastname}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
          />

          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="Street Address"
            fullWidth
            variant="standard"
          />

          <TextField
            name="postcode"
            value={customer.postcode}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="Post Code"
            fullWidth
            variant="standard"
          />

          <TextField
            name="city"
            value={customer.city}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />

          <TextField
            name="email"
            value={customer.email}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />

          <TextField
            name="phone"
            value={customer.phone}
            onChange={e=>handleInputChange(e)}
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
