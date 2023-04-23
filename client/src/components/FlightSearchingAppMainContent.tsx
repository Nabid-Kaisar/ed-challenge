import React, { useState } from 'react'

import FlightSelectionForm from '../forms/FlightSelectionForm'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'
import FlightDetails from './FlightDetails'
import { isAlphaChars } from '../util/utils'

function FlightSearchingAppMainContent({ filteredFlightData, handleCallPromotionPricesApi }: PromotionsPricesProps) {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const handleSetOrigin = (value: string) => {
        if (isAlphaChars(value)) {
            setOrigin(value.toUpperCase())
        } else {
            //show errors;
        }
    }

    const handleSetDestination = (value: string) => {
        if (isAlphaChars(value)) {
            setDestination(value.toUpperCase())
        } else {
            //show errors;
        }
    }

    return (
        <>
            <header className="main-header thin-divider">Find the Best Flights For Your Travel!</header>
            <section>
                <FlightSelectionForm
                    handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                    origin={origin as IATA}
                    setOrigin={handleSetOrigin}
                    destination={destination as IATA}
                    setDestination={handleSetDestination}
                />
            </section>
            <section>
                <FlightDetails details={filteredFlightData} />
            </section>
        </>
    )
}

export default FlightSearchingAppMainContent

interface PromotionsPricesProps {
    filteredFlightData: Array<PromotionsPriceOffersResponse> | null
    handleCallPromotionPricesApi: (origin: IATA, destination: IATA) => Promise<void>
}
