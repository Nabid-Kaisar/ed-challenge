import React, { useState } from 'react'
import './styles/App.css'
import FlightSearchingAppMainContent from './components/FlightSearchingAppMainContent'
import { getPromotionsPrices } from './apis/PromotionsPriceApi'
import { IATA } from './models/IATAType'
import { PromotionsPriceOffersResponse } from './models/PromotionsPriceOffersResponse'
import Loader from './components/common/Loader'

function FlightSearchingApp() {
    const [filteredFlightData, setFilteredFlightData] = useState<Array<PromotionsPriceOffersResponse>>([])
    const [showLoader, setShowLoader] = useState(false)

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
        setShowLoader(true)
        setFilteredFlightData([])
        const result = await getPromotionsPrices(origin, destination)
        setShowLoader(false)

        filtrationProcess(result.data, origin, destination)
    }

    return (
        <>
            <main>
                <FlightSearchingAppMainContent
                    handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                    filteredFlightData={filteredFlightData}
                />
            </main>
            {showLoader ? <Loader /> : null}
        </>
    )
}

export default FlightSearchingApp
