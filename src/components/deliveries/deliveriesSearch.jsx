import { Autocomplete, Button, Container, TextField } from "@mui/material";
import { ADDRESSES_STREET_URL, DELIVERIES_DETAILS_URL } from "../../infra/urls";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function DeliveriesSearch({setDeliveries}) {

  const [deliveryStreet, setDeliveryStreet] = useState([])
  const [selectedStreet, setSelectedStreet] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(ADDRESSES_STREET_URL)
      setDeliveryStreet(response.data)
    }
    fetchData()
  }, [])

  const handleRenderInput = (params) => {
    return <TextField {...params} label="חפש לפי רחוב" value={selectedStreet} 
      onChange={(e) => setSelectedStreet(e.target.value)}/>
}

  const handleSearch = async() => {
    const response = await axios.get(DELIVERIES_DETAILS_URL, {params: {street: selectedStreet}})
    setDeliveries(response.data)
  }
    return(
        <>
        <Container
        component={'form'} 
        onSubmit={(e) => {e.preventDefault()}}
        sx={{marginTop: '1em', display: 'flex'}}>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={deliveryStreet}
            sx={{ width: 300 }}
            renderInput={handleRenderInput}
            value={selectedStreet}
            onChange={(e, newValue) => {

              setSelectedStreet(newValue)
            }}
          />
          <Button onClick={handleSearch} sx={{color:"#191D88", fontWeight: 700}}>חפש</Button>
        </Container>
        </>
    )
}