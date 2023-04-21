import React, { useEffect, useState } from 'react'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'
import Card from './common/Card'

function FlightDetails({ details }: FlightDetailsProps) {
    console.log('details list::', details)
    if (!details) return null

    return (
        <div className="flight-details-container">
            {details.map((data) => (
                <Card
                    origin={data.origin}
                    destination={data.destination}
                    departureDate={data.departureDate}
                    returnDate={data.returnDate}
                    price={data.price.amount + ' ' + data.price.currency}
                    seatAvailability={data.seatAvailability}
                />
            ))}
        </div>
    )
}

export default FlightDetails

interface FlightDetailsProps {
    details: Array<PromotionsPriceOffersResponse> | null
}
