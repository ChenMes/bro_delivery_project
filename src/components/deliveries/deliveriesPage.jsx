import { useContext, useEffect, useState } from "react"
import * as urls from "../../infra/urls"
import axios from "axios"
import { Outlet, useNavigate } from "react-router-dom"
import { Button, Stack, Fab, Typography } from "@mui/material"
import DeliveriesList from "./delveriesList"
import DeliveriesSearch from "./deliveriesSearch"
import { UserContext } from "../context/userContext"
import { SetNotificationContext } from "../context/notificationContext"


const DeliveriesPage = () => {

  const setNotification = useContext(SetNotificationContext)

  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [deliveries, setDeliveries] = useState({results:[]})
  const [deliveryGuyDeliveries, setDeliveryGuyDeliveries] = useState({results:[]})
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]); 
  const [userData, setUserData] = useState(null);

  const handleCloseDelivery = async (updatedDelivery) => {
    try {
      const response = await axios.patch(
        `${urls.DELIVERY_GUY_DELIVERIES_LIST_URL}/${updatedDelivery.id}/`,
        { status: "משלוח סגור" }
      );
      if (response.status === 200) {
        fetchData(); // You may need to update your data fetching logic
        setNotification({
          open: true,
          message: "המשלוח נסגר",
        });
      } else {
        console.error(
          "Error updating delivery status to 'משלוח סגור': Unexpected response status",
          response.status
        );
      }
    } catch (error) {
      console.error("Error updating delivery status to 'משלוח סגור':", error);
      setNotification({
        open: true,
        message: "Error updating delivery status. Please try again.",
      });
    }
  };

  const onUpdateDeliveryStatus = async (updatedDelivery) => {
    try {
      const response = await axios.patch(
        `${urls.DELIVERIES_DETAILS_URL}/${updatedDelivery.id}/`,
        { status: "מצורף לשליח" }
      );
      if (response.status === 200) {
        console.log("Delivery status updated successfully");
        fetchData();
        setNotification({
          open: true,
          massage: 'המשלוח צורף למשלוחים שלי בהצלחה'
        })
      } else {
        console.error("Error updating delivery status: Unexpected response status", response.status);
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
      setNotification({
        open: true,
        massage: "Error creating/editing the event. Please try again."
      });
    }
  };

  const fetchData = async () => {
    let urlToSend = urls.NEW_DELIVERY_LIST_URL;
    if (deliveries.results.length > 0) {
      urlToSend = deliveries.next;
    }
  

    if (!urlToSend) {
      console.error("urlToSend is null or undefined. Check your URL configuration.");
      return; // Exit the function early to avoid making a request with a null URL
    }
  
  
    try {
      const response = await axios.get(urlToSend);
  
      setDeliveries({
        ...deliveries,
        next: response.data.next,
        results: [...deliveries.results, ...response.data.results],
      });
    } catch (e) {
      console.error(e);
    }
  }


    useEffect(
      () => {
          fetchData()
      }
    ,[]
)

const deliveryGuyFetchData = async () => {
  try {
    const responseData = await axios.get(urls.DELIVERY_GUY_DELIVERIES_LIST_URL);
    console.log("response", responseData);

    // Assuming the data is an array directly (without "results" property)
    setDeliveryGuyDeliveries({ results: responseData.data });

  } catch (e) {
    console.error(e);
  }
};


  useEffect(
    () => {
      deliveryGuyFetchData()
    }
  ,[]
)
  return(
    <>
      <Stack alignItems='center'>
        <br />
        <br />
        <br />
        <Typography sx={{ color: '#1450A3' }} variant="h3">
          משלוחים פתוחים
        </Typography>
        <br />
        <br />
        <DeliveriesSearch setDeliveries={setDeliveries} />
      </Stack>

       {/* Display the original list with the "Update Status" button */}
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <DeliveriesList deliveries={deliveries} loadMore={fetchData} onUpdateDeliveryStatus={onUpdateDeliveryStatus} displayUpdateButton={true}  />
      </Stack>
      <br />
      <br />
      <Typography sx={{ color: '#1450A3' }} variant="h3">
        משלוחים שלי
      </Typography>
      <br />
      <br />
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <DeliveriesList deliveries={deliveryGuyDeliveries} onUpdateDeliveryStatus={onUpdateDeliveryStatus} handleCloseDelivery={handleCloseDelivery} displayUpdateButton={false} />
      </Stack>


      <Outlet />
    </>
  );
};

export default DeliveriesPage;