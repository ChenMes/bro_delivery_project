import { createContext, useContext, useState } from "react";

const DeliveriesContext = createContext();

export function useDeliveriesContext() {
  return useContext(DeliveriesContext);
}

export function DeliveriesProvider({ children }) {
  const [deliveries, setDeliveries] = useState({ results: [] });
  const [updatedDeliveries, setUpdatedDeliveries] = useState([]);

  const handleUpdateDeliveryStatus = async (updatedDelivery) => {
    setUpdatedDeliveries([...updatedDeliveries, updatedDelivery]);
  };

  const value = {
    deliveries,
    setDeliveries,
    updatedDeliveries,
    setUpdatedDeliveries,
    handleUpdateDeliveryStatus,
  };

  return (
    <DeliveriesContext.Provider value={value}>
      {children}
    </DeliveriesContext.Provider>
  );
}