import React, { useEffect, useState } from 'react'
import './styles/App.css'
import FlightSearchingAppMainContent from './components/FlightSearchingAppMainContent'
import { getPromotionsPrices } from './apis/PromotionsPriceApi'
import { IATA } from './models/IATAType'
import { PromotionsPriceOffersResponse } from './models/PromotionsPriceOffersResponse'
import Loader from './components/common/Loader'
import { filterCriteria } from './constants/CONSTANTS'

const { DEFAULT, PRICE } = filterCriteria
//cached original response to avoid further api calling...
let CACHED_DATA: Array<PromotionsPriceOffersResponse> = []

function FlightSearchingApp() {
    const [filteredFlightData, setFilteredFlightData] = useState<Array<PromotionsPriceOffersResponse>>([])
    const [showLoader, setShowLoader] = useState(false)
    const [sortBy, setSortBy] = useState('')

    useEffect(() => {
        setFilteredFlightData(sortFlightData([...filteredFlightData], sortBy))
    }, [sortBy])

    const setFilterData = (details: Array<PromotionsPriceOffersResponse>, origin: IATA, destination: IATA) => {
        if (!details) {
            setFilteredFlightData([])
            return
        }

        setFilteredFlightData(details)
    }

    const filterDataByOrigin = (details: Array<PromotionsPriceOffersResponse>, origin: IATA, destination: IATA) => {
        const filteredData = details.filter((flight) => flight.origin === origin && flight.destination === destination)
        return filteredData
    }
    const handleCallPromotionPricesApi = async (origin: IATA, destination: IATA) => {
        setShowLoader(true)
        setFilteredFlightData([])
        const result = await getPromotionsPrices(origin, destination)
        // const sortedResult = sortFlightData(result.data as Array<PromotionsPriceOffersResponse>, sortBy)
        setSortBy(DEFAULT)
        const filteredData = filterDataByOrigin(result.data, origin, destination)
        CACHED_DATA = filteredData
        setShowLoader(false)
        setFilterData(filteredData, origin, destination)
    }

    const sortFlightData = (
        flights: Array<PromotionsPriceOffersResponse>,
        criteria: string
    ): Array<PromotionsPriceOffersResponse> => {
        if (criteria === DEFAULT) {
            console.log('CACHED_DATA::', CACHED_DATA)
            return CACHED_DATA
        }

        if (criteria === PRICE) {
            flights.sort((flight1, flight2) => {
                return flight1.price.amount - flight2.price.amount
            })
            return flights
        } //else if more sorting criteria can be implemented here...

        return flights
    }

    return (
        <>
            <main>
                <FlightSearchingAppMainContent
                    handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                    filteredFlightData={filteredFlightData}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </main>
            {showLoader ? <Loader /> : null}
        </>
    )
}

export default FlightSearchingApp
