import { Button } from "@mui/material";
import NewDelModal from "../deliveries/newDelModal";


import { Outlet } from "react-router-dom";
import { DELIVERIES_DETAILS_URL, RESTAURANT_DELIVERIES_LIST_URL } from "../../infra/urls";
import { Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import RestuarentDeliveries from "./restaurantsList";
import { SetNotificationContext } from "../context/notificationContext";


const RestaurantPage = () => {

  const user = useContext(UserContext)
  const [openAddRestModal, setOpenAddRestModal] = useState(false)
  const [restuarntDeliveries, setRestuarntDeliveries] = useState([{}])
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]); 
  const [userData, setUserData] = useState(null);
  const setNotification = useContext(SetNotificationContext)



  const handleUpdateDeliveryStatus = async (updatedDelivery) => {
    try {
      const response = await axios.patch(
        `${DELIVERIES_DETAILS_URL}/${updatedDelivery.id}/`,
        { status: "מצורף לשליח" }
      );
      if (response.status === 200) {
        console.log("Delivery status updated successfully");
        fetchRestuarntDeliveries();
        setNotification({
          open: true,
          message: "משלוח חדש נכנס למערכת",
        });
      } else {
        console.error("Error updating delivery status: Unexpected response status", response.status);
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
      setNotification({
        open: true,
        message: "הכנסת משלוח למערכת נכשל",
      });
    }
  };

  const fetchRestuarntDeliveries = async () => {
    try {
      const response = await axios.get(RESTAURANT_DELIVERIES_LIST_URL)
        setRestuarntDeliveries(response.data)
        console.log('Response', response.data)
    } catch (e) {
      console.error('Error', e)
    }
  }



    useEffect(
      () => {
          fetchRestuarntDeliveries()
      }
    ,[]
)
  return(
    <>
      <br />
      <Typography sx={{ color: '#1450A3' }} variant="h3">
        משלוחים שלי
      </Typography>
      <br />
      <br />
      {/* Display the new list of updated deliveries without the "Update Status" button */}
      <RestuarentDeliveries restuarntDeliveries={restuarntDeliveries} loadMore={fetchRestuarntDeliveries} onUpdateDeliveryStatus={handleUpdateDeliveryStatus} displayUpdateButton={true} />
      <Button onClick={() => {setOpenAddRestModal(true)}}
      >משלוח חדש
      </Button>
      <NewDelModal
      open={openAddRestModal}
      setOpen={setOpenAddRestModal}
      />


      <Outlet />
    </>
  );
};

export default RestaurantPage;


