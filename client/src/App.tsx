import React, { useState } from "react";
import FlightSearchingApp from "./components/FlightSearchingApp";
import "./styles/App.css";
import { getPromotionsPrices } from "./apis/PromotionsPriceApi";
import { IATA } from "./models/IATAType";

function App() {
  const [promotionsPrices, setPromotionsPrices] = useState(null);

  const handleCallPromotionPricesApi = async (
    origin: IATA,
    destination: IATA
  ) => {
    const result = await getPromotionsPrices(origin, destination);
    setPromotionsPrices(result.data);
  };

  return (
    <main>
      <FlightSearchingApp
        handleCallPromotionPricesApi={handleCallPromotionPricesApi}
        promotionsPrices={promotionsPrices}
      />
    </main>
  );
}

export default App;
