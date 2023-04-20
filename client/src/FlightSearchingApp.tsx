import React, { useState } from 'react'
import './styles/App.css'
import FlightSearchingAppMainContent from './components/FlightSearchingAppMainContent'
import { getPromotionsPrices } from './apis/PromotionsPriceApi'
import { IATA } from './models/IATAType'
import { PromotionsPriceOffersResponse } from './models/PromotionsPriceOffersResponse'

function FlightSearchingApp() {
    const [flightDetails, setFlightDetails] = useState(null)
    const [filteredFlightData, setFilteredFlightData] = useState<Array<PromotionsPriceOffersResponse>>([])
    const filtrationProcess = (details: Array<PromotionsPriceOffersResponse>, origin: IATA, destination: IATA) => {
        if (!details) {
            setFilteredFlightData([])
            return
        }

        setFilteredFlightData(
            details.filter((flight) => flight.origin === origin && flight.destination === destination)
        )
    }
    const handleCallPromotionPricesApi = async (origin: IATA, destination: IATA) => {
        const result = await getPromotionsPrices(origin, destination)
        filtrationProcess(result.data, origin, destination)
    }

    return (
        <main>
            <FlightSearchingAppMainContent
                handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                filteredFlightData={filteredFlightData}
            />
        </main>
    )
}

export default FlightSearchingApp
