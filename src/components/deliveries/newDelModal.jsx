import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, useThemeProps } from '@mui/material';
import { ADRESSES_DETAILES_URL, CREATE_DELIVERY_URL, DELIVERIES_DETAILS_URL } from '../../infra/urls';
import { UserContext } from '../context/userContext';
import CustomersSearch from '../restaurants/customersSearch';
import { useState } from 'react';


export default function NewDelModal({open, setOpen}) {
  const [customers, setCustomers] = useState({results:[]})
  const [preparation_time, setPreparation_time] = React.useState("")
  const [payment, setPayment] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [customer, setCustomer] = React.useState("")
  const [spacial_comment, setSpacialComment] = React.useState("")

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if 'address' is a valid address ID
    if (!address) {
      console.error('Address is required.');
      return;
    }
  
    // Query the Address model to check if the provided address ID exists
    try {
      const addressResponse = await axios.get(`${ADRESSES_DETAILES_URL}/${address}`); // Replace with your actual API endpoint
      if (!addressResponse.data) {
        console.error('Invalid address ID.');
        return;
      }
  
      // Continue with creating the delivery record
      const deliveryData = {
        preparation_time: Number(preparation_time),
        payment: payment === 'True'? true: false,
        price: Number(price),
        address: Number(address),
        // customer: Number(customer),
      };
      console.log('DELIVERY:', JSON.stringify(deliveryData))

      // Perform the POST request to create the delivery
      const response = await axios.post(CREATE_DELIVERY_URL, deliveryData);
  
      if (response.status === 200) {
        console.log('Delivery created successfully.');
        // You can take further actions here.
      } else {
        console.error('Failed to create delivery.');
        // Display a user-friendly error message to the user.
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Response data:', error.response.data);
      // Display a user-friendly error message to the user.
    }
  };
 

  const handleClose = () => {
    setOpen(false);

  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>משלוח חדש</DialogTitle>
        <DialogContent>
        <CustomersSearch setCustomers={setCustomers} />
          <form id='deliveryForm'>
          {/* <TextField 
            autoFocus
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            value={status}
            onChange={(e) => setStatus(e.target.value)} */}
          {/* /> */}
          <TextField
            autoFocus
            margin="dense"
            id="preparation_time"
            label="Preparation time"
            type="number"
            fullWidth
            variant="standard"
            value={preparation_time}
            onChange={(e) => setPreparation_time(e.target.value)}
          />
          <TextField 
            autoFocus
            margin="dense"
            id="payment"
            label="מזומן"
            type="text"
            fullWidth
            variant="standard"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
          <TextField 
            margin="dense"
            id="price"
            label="מחיר"
            type="number"
            fullWidth
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField 
            autoFocus
            margin="dense"
            id="spacial_comment"
            label="Spacial comment"
            type="text"
            fullWidth
            variant="standard"
            value={spacial_comment}
            onChange={(e) => setSpacialComment(e.target.value)}
          />
          <TextField 
          autoFocus
          margin="dense"
          id="address.id"
          label="Address ID"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField 
            autoFocus
            margin="dense"
            id="customer"
            label="Customer"
            type="text"
            fullWidth
            variant="standard"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}