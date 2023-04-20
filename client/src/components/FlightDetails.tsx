import React, { useEffect, useState } from 'react'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'

function FlightDetails({ details, origin, destination }: FlightDetailsProps) {
    console.log('details list::', details)
    const [filteredData, setFilteredData] = useState<Array<PromotionsPriceOffersResponse>>([])

    const filtrationProcess = () => {
        if (!details) {
            setFilteredData([])
            return
        }

        setFilteredData(details.filter((flight) => flight.origin === origin && flight.destination === destination))
    }

    useEffect(() => {
        filtrationProcess()
    }, [origin, destination, details])

    if (!details) return null

    return (
        <>
            {filteredData.map((data) => (
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
    origin: IATA
    destination: IATA
}
