import server_dummy_api_response_sorting from './server_dummy_response_partial_sorting.json'
import { render, screen } from '@testing-library/react'
import { isFlightsArraySorted, sortFlightData } from '../util/utils'
import { filterCriteria } from '../constants/CONSTANTS'
import { IATA } from '../models/IATAType'
import FlightSearchingAppMainContent from '../components/FlightSearchingAppMainContent'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import * as React from 'react'
import userEvent from '@testing-library/user-event'

const { PRICE } = filterCriteria

const setup = () => {
    const dummyApiRes = server_dummy_api_response_sorting
    const mockHandleCallPromotionPricesApi = jest.fn(async (origin: IATA, destination: IATA) => {})

    const utils = render(
        <FlightSearchingAppMainContent
            handleCallPromotionPricesApi={mockHandleCallPromotionPricesApi}
            filteredFlightData={dummyApiRes as Array<PromotionsPriceOffersResponse>}
            sortBy={PRICE}
            setSortBy={() => {}}
        />
    )

    const selectBox = screen.getByRole('combobox') as HTMLSelectElement

    return { selectBox, ...utils }
}

const userEventSetup = () => {
    return {
        user: userEvent.setup(),
    }
}
describe('sorting functionality works', () => {
    it('when select box option price selected, it changes to price correctly', async () => {
        const { selectBox } = setup()
        const user = userEventSetup().user

        await user.selectOptions(selectBox, [PRICE])
        expect(selectBox.value).toBe(PRICE)
    })

    it('sorts the results by price when select value changes to price', async () => {
        const dummyRes = server_dummy_api_response_sorting as Array<PromotionsPriceOffersResponse>
        const { PRICE } = filterCriteria

        //checking if pure function working correctly;
        const sortedData = sortFlightData(dummyRes, PRICE, dummyRes)
        expect(isFlightsArraySorted(sortedData)).toBe(true)
    })
})
