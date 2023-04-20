import React from 'react';

import FlightSelectionForm from "../forms/FlightSelectionForm";
import {PromotionsPriceOffersResponse} from "../models/PromotionsPriceOffersResponse";
import {IATA} from "../models/IATAType";

function FlightSearchingApp({promotionsPrices, handleCallPromotionPricesApi}: PromotionsPricesProps){
    return (
        <>
            <FlightSelectionForm handleCallPromotionPricesApi={handleCallPromotionPricesApi}/>
            {promotionsPrices }
        </>
    );
}

export default FlightSearchingApp;

interface PromotionsPricesProps {
    promotionsPrices: Array<PromotionsPriceOffersResponse> | null;
    handleCallPromotionPricesApi: (origin: IATA, destination: IATA) => Promise<void>;
}
