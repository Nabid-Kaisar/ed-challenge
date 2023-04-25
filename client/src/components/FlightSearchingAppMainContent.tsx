import React, { Dispatch, SetStateAction, useState } from 'react'
import FlightSelectionForm from '../forms/FlightSelectionForm'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { IATA } from '../models/IATAType'
import FlightDetails from './FlightDetails'
import { isAlphaChars } from '../util/utils'
import Select from './common/Select'
import { filterCriteria } from '../constants/CONSTANTS'

const { DEFAULT, PRICE } = filterCriteria
const options = [
    { value: DEFAULT, label: '---Sort By---' },
    { value: PRICE, label: 'Price low to high' },
]
function FlightSearchingAppMainContent({
    filteredFlightData,
    handleCallPromotionPricesApi,
    sortBy,
    setSortBy,
}: PromotionsPricesProps) {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const handleSetOrigin = (value: string) => {
        if (isAlphaChars(value)) {
            setOrigin(value.toUpperCase())
        }
    }

    const handleSetDestination = (value: string) => {
        if (isAlphaChars(value)) {
            setDestination(value.toUpperCase())
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
                <Select
                    options={options}
                    value={sortBy}
                    onChange={(e: Event) => {
                        setSortBy((e.target as HTMLSelectElement).value)
                    }}
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
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
}
