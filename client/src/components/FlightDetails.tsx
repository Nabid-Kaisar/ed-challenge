import React, { useEffect, useState } from 'react'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'

function FlightDetails({ details }: FlightDetailsProps) {
    console.log('details list::', details)
    if (!details) return null

    return (
        <>
            {details.map((data) => (
                <>
                    <ul>
                        <li>{data.price.amount + ' ' + data.price.currency}</li>
                        <li>{data.seatAvailability}</li>
                        <li>{data.departureDate}</li>
                        <li>{data.returnDate}</li>
                    </ul>
                </>
            ))}
        </>
    )
}

export default FlightDetails

interface FlightDetailsProps {
    details: Array<PromotionsPriceOffersResponse> | null
}
