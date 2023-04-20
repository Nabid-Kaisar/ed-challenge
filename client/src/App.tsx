import React, {useState} from 'react';
import FlightSearchingApp from "./components/FlightSearchingApp";
import axios from "axios";
import {getPromotionsPrices} from "./apis/PromotionsPriceApi";
import {IATA} from "./models/IATAType";

function App() {
    const [promotionsPrices, setPromotionsPrices] = useState(null);

    const handleCallPromotionPricesApi = async (origin: IATA, destination: IATA) => {
        const result = await getPromotionsPrices(origin, destination);
        setPromotionsPrices(result.data);
    }

    return (
        <>
            <FlightSearchingApp handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                                promotionsPrices={promotionsPrices}/>
        </>
    );
}

export default App;
