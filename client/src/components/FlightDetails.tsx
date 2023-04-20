import React, { useEffect } from "react";
import { PromotionsPriceOffersResponse } from "../models/PromotionsPriceOffersResponse";
import { IATA } from "../models/IATAType";

function FlightDetails({ details, origin, destination }: FlightDetailsProps) {
  const filtrationProcess = () => {
    console.log(details);
  };

  useEffect(() => {
    filtrationProcess();
  }, [origin, destination, details]);

  if (!details) return null;

  return (
    <>
      <h2>{details[0].price.amount}</h2>
    </>
  );
}

export default FlightDetails;

interface FlightDetailsProps {
  details: Array<PromotionsPriceOffersResponse> | null;
  origin: IATA;
  destination: IATA;
}
