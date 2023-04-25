import React, { useEffect, useState } from 'react'
import './styles/App.css'
import FlightSearchingAppMainContent from './components/FlightSearchingAppMainContent'
import { getPromotionsPrices } from './apis/PromotionsPriceApi'
import { IATA } from './models/IATAType'
import { PromotionsPriceOffersResponse } from './models/PromotionsPriceOffersResponse'
import Loader from './components/common/Loader'
import { filterCriteria } from './constants/CONSTANTS'
import { sortFlightData } from './util/utils'

const { DEFAULT } = filterCriteria
//cached original response to avoid further api calling...
let CACHED_DATA: Array<PromotionsPriceOffersResponse> = []

function FlightSearchingApp() {
    const [filteredFlightData, setFilteredFlightData] = useState<Array<PromotionsPriceOffersResponse>>([])
    const [showLoader, setShowLoader] = useState(false)
    const [sortBy, setSortBy] = useState('')
    const [dataFound, setDataFound] = useState<string | boolean>('initial')

    useEffect(() => {
        setFilteredFlightData(sortFlightData([...filteredFlightData], sortBy, CACHED_DATA))
    }, [sortBy])

    const setFilterData = (details: Array<PromotionsPriceOffersResponse>, origin: IATA, destination: IATA) => {
        if (!details || details.length === 0) {
            setFilteredFlightData([])
            setDataFound(false)
            return
        } else {
            setDataFound(true)
        }

        setFilteredFlightData(details)
    }

    const filterDataByOrigin = (details: Array<PromotionsPriceOffersResponse>, origin: IATA, destination: IATA) => {
        const filteredData = details.filter((flight) => flight.origin === origin && flight.destination === destination)
        return filteredData
    }
    const handleCallPromotionPricesApi = async (origin: IATA, destination: IATA) => {
        setShowLoader(true)
        //resetting as new call
        setFilteredFlightData([])
        const result = await getPromotionsPrices(origin, destination)
        setSortBy(DEFAULT)
        const filteredData = filterDataByOrigin(result.data, origin, destination)
        //caching data so that we do not need extra api call again
        CACHED_DATA = filteredData
        setShowLoader(false)
        setFilterData(filteredData, origin, destination)
    }

    return (
        <>
            <main>
                <FlightSearchingAppMainContent
                    handleCallPromotionPricesApi={handleCallPromotionPricesApi}
                    filteredFlightData={filteredFlightData}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    dataFound={dataFound}
                />
            </main>
            {showLoader ? <Loader /> : null}
        </>
    )
}

export default FlightSearchingApp
