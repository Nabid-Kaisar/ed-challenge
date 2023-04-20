import React, { useState } from 'react'

import FlightSelectionForm from '../forms/FlightSelectionForm'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'
import FlightDetails from './FlightDetails'

function FlightSearchingAppMainContent({ flightDetails, handleCallPromotionPricesApi }: PromotionsPricesProps) {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    return (
        <>
            <header className="main-header">Find the Best Flight Options For Your Travel</header>
            <section>
                <FlightSelectionForm
                    handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                    origin={origin as IATA}
                    setOrigin={setOrigin}
                    destination={destination as IATA}
                    setDestination={setDestination}
                />
            </section>
            <section>
                <FlightDetails details={flightDetails} origin={origin as IATA} destination={destination as IATA} />
            </section>
        </>
    )
}

export default FlightSearchingAppMainContent

interface PromotionsPricesProps {
    flightDetails: Array<PromotionsPriceOffersResponse> | null
    handleCallPromotionPricesApi: (origin: IATA, destination: IATA) => Promise<void>
}
