import React, { useState } from "react";
import "./styles/App.css";
import FlightSearchingAppMainContent from "./components/FlightSearchingAppMainContent";
import { getPromotionsPrices } from "./apis/PromotionsPriceApi";
import { IATA } from "./models/IATAType";

function FlightSearchingApp() {
  const [flightDetails, setFlightDetails] = useState(null);

  const handleCallPromotionPricesApi = async (
    origin: IATA,
    destination: IATA
  ) => {
    const result = await getPromotionsPrices(origin, destination);
    setFlightDetails(result.data);
  };

  return (
    <main>
      <FlightSearchingAppMainContent
        handleCallPromotionPricesApi={handleCallPromotionPricesApi}
        flightDetails={flightDetails}
      />
    </main>
  );
}

export default FlightSearchingApp;
