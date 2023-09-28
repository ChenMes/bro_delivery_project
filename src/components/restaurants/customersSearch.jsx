import { Autocomplete, Button, Container, TextField } from "@mui/material";
import { CUSTOMERS_DETAILS_URL, CUSTOMERS_PHONE_URL } from "../../infra/urls";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomersSearch({setCustomers}) {

  const [customerPhone, setCustomerPhone] = useState([])
  const [selectedPhone, setSelectedPhone] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(CUSTOMERS_PHONE_URL)
      setCustomerPhone(response.data)
    }
    fetchData()
  }, [])

  const handleRenderInput = (params) => {
    return <TextField {...params} label="טלפון לקוח" value={selectedPhone} 
      onChange={(e) => setSelectedPhone(e.target.value)}/>
}

  const handleSearch = async() => {
    const response = await axios.get(CUSTOMERS_DETAILS_URL, {params: {phone_number: selectedPhone}})
    setCustomers(response.data)
  }
    return(
        <>
        <Container
        component={'form'} 
        onSubmit={(e) => {e.preventDefault()}}
        sx={{marginTop: '1em', display: 'flex'}}>

          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customerPhone}
            sx={{ width: 300 }}
            renderInput={handleRenderInput}
            value={selectedPhone}
            onChange={(e, newValue) => {

              setSelectedPhone(newValue)
            }}
          /> */}
          <Button onClick={handleSearch} sx={{color:"#191D88", fontWeight: 700}}>חפש</Button>
        </Container>
        </>
    )
}