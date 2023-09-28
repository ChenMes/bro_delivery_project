import { Snackbar } from "@mui/material"
import { useState } from "react"
import { SetNotificationContext } from "../context/notificationContext"

const Notification = ({children}) => {

  const [notification, setNotification] = useState({
    open: false,
    massage: ""
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      // return;
    }

    setNotification({...notification, open: false})
  }

  return(
    <>
    <SetNotificationContext.Provider value={setNotification}>
    {children}
    </SetNotificationContext.Provider>

      <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={notification.massage}
      // action={action}
    />
  </>
  )
}

export default Notification