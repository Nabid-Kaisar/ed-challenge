import React from 'react'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import Card from './common/Card'

function FlightDetails({ details }: FlightDetailsProps) {
    console.log('filteredFlightData::', details)
    if (!details) return null

    return (
        <div className="flight-details-container">
            {details.map((data, index) => (
                <Card
                    key={index}
                    origin={data.origin}
                    destination={data.destination}
                    departureDate={data.departureDate}
                    returnDate={data.returnDate}
                    price={data.price.amount + ' ' + data.price.currency}
                    seatAvailability={data.seatAvailability}
                    index={index}
                />
            ))}
        </div>
    )
}

export default FlightDetails

interface FlightDetailsProps {
    details: Array<PromotionsPriceOffersResponse> | null
}
