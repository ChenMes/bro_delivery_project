import { Container, List } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import DeliveryItem from "./deliveriesItem";

export default function DeliveriesList({deliveries,loadMore,onUpdateDeliveryStatus,displayUpdateButton,onDeliveredStatus,handleCloseDelivery,}){
  
  console.log('deliveries', deliveries)

  const {count, next, results} = deliveries || {}
  
  

  const items = results ? results.map((delivery) => {

    console.log('Delivery:', delivery);




    return <DeliveryItem 
    key={delivery.id} 
    myDelivery={delivery} 
    onUpdateDeliveryStatus={onUpdateDeliveryStatus} 
    onDeliveredStatus={onDeliveredStatus}
    handleCloseDelivery={handleCloseDelivery}
    displayUpdateButton={displayUpdateButton}/>
  })
  :
  null

  

  return(
    <Container sx={{overflow: 'auto', height: '600px'}}>
      <List sx={{maxWidth: '100%', padding: 0}}>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={next !== null}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}>
                {items}
        </InfiniteScroll>
    </List>
    </Container>
  )

}