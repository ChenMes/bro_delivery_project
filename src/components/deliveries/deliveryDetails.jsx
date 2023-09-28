

// const DeliveryDetails = () => {

//   const {deliveryId} = useParams()
//   const [delivery, setDelivery] = useState({})

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//   const deliveryData = {
//     status: 'ממתין לשליח'
//   }

//   console.log('deliveryData', deliveryData)

//   try{

//       const response = await axios.patch(`${DELIVERIES_DETAILS_URL}/${delivery.id}`, deliveryData);
//       console.log("delivery updated", response.data)

//   } catch (error) {
//     console.log('Error', error);
//   }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`${DELIVERIES_DETAILS_URL}/${deliveryId}`)
//       setDelivery(response.data)
      
//     }
//     fetchData()
//   }, [deliveryId])

//   return(
//     <>
// <Stack direction="column" spacing={2} sx={{ direction: "rtl" }}>
//       <br />
//       {delivery && (
//         <>
//           <p>{`סטטוס: ${delivery.status}`}</p>
//           <p>{`שעת הזמנה: ${new Date(delivery.time).toLocaleString()}`}</p>
//           <p>{`זמן הכנה: ${delivery.preparation_time}`}</p>
//           {delivery.restaurant && (
//             <>
//             <p>{`כתובת המסעדה: ${delivery.restaurant.user.name}`}</p>
//             <p>{`כתובת המסעדה: ${delivery.restaurant.address}`}</p>
//             <p>{`שליח ${delivery.delivery_guy.id}`}</p>
//             </>
//           )}
//           <strong><u><p>{`כתובת משלוח:`}</p></u></strong>
//           {delivery.address && (
//             <>
//               <p>{`רחוב: ${delivery.address.street} ${delivery.address.number}`}</p>
//               <p>{`בית פרטי: ${delivery.address.building_type}`}</p>
//               <p>{`כניסה: ${delivery.address.enter || ""}  || קומה: ${delivery.address.floor || ""} || דירה: ${delivery.address.appartement || ""}`}</p>
//               <p>{`סיסמא לביניין: ${delivery.address.building_password || ""}`}</p>
//               <p>{`הערות מיוחדות: ${delivery.address.spacial_comment || ""}`}</p>
//             </>
//           )}
//           <strong><u><p>{`פרטי לקוח:`}</p></u></strong>
//           {delivery.customer ? (
//             <>
//               <p>{`שם: ${delivery.customer.name || "none"}`}</p>
//               <p>{`טלפון: ${delivery.customer.phone_number || "none"}`}</p>
//             </>
//           ) : (
//             <p></p>
//           )}
//           <br />
//           <br />
//           <p>{`מזומן: ${delivery.payment}`}</p>
//           <p>{`מחיר: ${delivery.price}`}</p>
//         </>
//       )}
//       <Button onClick={handleSubmit}>קח משלוח</Button>
//     </Stack>

    

//     </>

    

//   )
// }

// export default DeliveryDetails; 