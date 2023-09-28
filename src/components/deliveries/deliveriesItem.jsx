import { Button, IconButton, ListItem, Modal, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import DeliveryDiningTwoToneIcon from '@mui/icons-material/DeliveryDiningTwoTone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState } from "react";

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  // Add direction: rtl; for right-to-left content
  direction: 'rtl',
  textAlign: 'center', // Center text
};

const iconStyle = {
  marginLeft: '8px', // Add space between icon and text
  verticalAlign: 'middle', // Vertically align icon
};

export default function DeliveryItem({ myDelivery, onUpdateDeliveryStatus, displayUpdateButton }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigate(`/deliveries/${myDelivery.id}`);
  };

  const handleUpdateStatus = () => {
    onUpdateDeliveryStatus(myDelivery);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };


  const handleCloseModal = () => {
    setOpen(false);
  };

  const paymentType = myDelivery.payment ? 'תשלום: מזומן' : 'תשלום: אשראי';

  return (
    <ListItem sx={{ height: '100px' }}>
      <Paper elevation={3}
        sx={{
          width: '100%', height: 60,
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: '2em'
        }}>
        <IconButton>
          <RemoveRedEyeTwoToneIcon onClick={handleOpenModal} sx={{ fill: "#FFC436" }} />
        </IconButton>
        <Typography variant="subtitle1" sx={{ color: "grey" }} >{`${myDelivery?.address?.street ?? 'N/A'} ${myDelivery?.address?.number ?? 'N/A'}`}</Typography>
        {displayUpdateButton && (
          <IconButton>
            <DeliveryDiningTwoToneIcon onClick={handleUpdateStatus} sx={{ fill: "#FFC436" }} />
          </IconButton>
        )}
        {/* <IconButton>
        <AccessTimeIcon onClick={handleCloseDelivery} sx={{ fill: "#337CCF" }} />
        </IconButton> */}
        

        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="delivery-details-modal-title"
          aria-describedby="delivery-details-modal-description"
        >
          <Paper sx={{
            ...style,
            width: 400,
            overflow: "auto",
          }}>
            <Typography variant="h4" id="delivery-details-modal-title" gutterBottom>
              פרטי משלוח
            </Typography>
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>סטטוס:</strong>
              {myDelivery.status}
            </Typography>
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>שעת הזמנה:</strong>
              {new Date(myDelivery.time).toLocaleString()}
            </Typography>
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>זמן הכנה:</strong>
              {myDelivery.preparation_time}
            </Typography>
            {myDelivery.restaurant && (
  <>
    <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
      <strong>מסעדה:</strong>
      {myDelivery.restaurant.user?.first_name || "N/A"}
    </Typography>
    <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
      <strong>כתובת המסעדה:</strong>
      {`${myDelivery.restaurant.address?.street || "N/A"} ${myDelivery.restaurant.address?.number || "N/A"}`}
    </Typography>
    {myDelivery.delivery_guy && (
      <>
        <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
          <strong>שליח:</strong>
          {myDelivery.delivery_guy.user?.first_name || "N/A"}
        </Typography>
        <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
          <strong>טלפון שליח:</strong>
          {myDelivery.delivery_guy?.phone_number || "N/A"}
        </Typography>
      </>
    )}
  </>
)}
            <br />
              <LocationOnIcon sx={iconStyle} />
              <br />
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>כתובת משלוח:</strong>
              <br />
            
              {`רחוב: ${myDelivery?.address?.street ?? 'N/A'} ${myDelivery?.address?.number ?? 'N/A'}`}
              <br />
              {`בית פרטי: ${myDelivery?.address?.building_type ?? 'N/A'}`}
              <br />
              {`כניסה: ${myDelivery?.address?.enter  ?? 'N/A'}`}
              {`קומה: ${myDelivery?.address?.floor  ?? 'N/A'}`}
              {`דירה: ${myDelivery?.address?.appartement  ?? 'N/A'}`}
              <br />
              {`סיסמא לביניין: ${myDelivery?.address?.building_password  ?? 'N/A'}`}
              <br />
              {`הערות מיוחדות: ${myDelivery?.address?.spacial_comment  ?? 'N/A'}`}
            </Typography>
            <br />
            <PersonIcon sx={iconStyle} />
            <br />
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>פרטי לקוח:</strong>
              {myDelivery.customer ? (
                <>
                  <br />
                  {`שם: ${myDelivery?.customer?.name  ?? 'N/A'}`}
                  <br />
                  {`טלפון: ${myDelivery.customer.phone_number || "none"}`}
                </>
              ) : (
                "none"
              )}
            </Typography>
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              {paymentType}
            </Typography>
            <Typography variant="body1" id="delivery-details-modal-description" sx={{ mt: 2 }}>
              <strong>מחיר:</strong>
              <PaymentIcon sx={iconStyle} />
              {myDelivery.price}
            </Typography>
          </Paper>
        </Modal>
      </Paper>
    </ListItem>
  );
}
