import { Container, List } from "@mui/material";
import DeliveryItem from "../deliveries/deliveriesItem";
import InfiniteScroll from "react-infinite-scroller";

const RestuarentDeliveries = ({restuarntDeliveries, onUpdateDeliveryStatus,displayUpdateButton}) => {
  console.log('restuarant', restuarntDeliveries)

  if (!Array.isArray(restuarntDeliveries) || restuarntDeliveries.length === 0 ) {
    return(
      <p>No restaurant events available</p>
    )
  }


  const items = restuarntDeliveries.map((delivery) => {
    return <DeliveryItem  key={delivery.id} myDelivery={delivery} onUpdateDeliveryStatus={onUpdateDeliveryStatus} displayUpdateButton={displayUpdateButton} />
    })
 

  return(
    <Container sx={{overflow: 'auto', height: '600px'}}>
      <List sx={{maxWidth: '100%', padding: 0}}>
        <InfiniteScroll
            pageStart={0}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}>
                {items}
        </InfiniteScroll>
    </List>
    </Container>
  )

}

export default RestuarentDeliveries