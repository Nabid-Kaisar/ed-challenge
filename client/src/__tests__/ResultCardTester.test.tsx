import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { IATA } from '../models/IATAType'
import FlightSearchingAppMainContent from '../components/FlightSearchingAppMainContent'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import server_dummy_api_response from './server_dummy_response_partial.json'
import { convertSvrDateToUiDate } from '../util/utils'
import { filterCriteria } from '../constants/CONSTANTS'

const { PRICE } = filterCriteria

const setup = () => {
    const dummyApiRes = server_dummy_api_response

    const mockHandleCallPromotionPricesApi = jest.fn(async (origin: IATA, destination: IATA) => {})

    const utils = render(
        <FlightSearchingAppMainContent
            handleCallPromotionPricesApi={mockHandleCallPromotionPricesApi}
            filteredFlightData={dummyApiRes as Array<PromotionsPriceOffersResponse>}
            sortBy={PRICE}
            setSortBy={() => {}}
        />
    )

    return { ...utils }
}

describe('card view of available flights showing correct data', () => {
    it('shows correct number of cards of data, if  form submission successful and api has data', async () => {
        setup()
        const dummyRes = server_dummy_api_response
        //checking if 3 api response data has been rendered to the dom
        for (let i = 0; i < dummyRes.length; i++) {
            screen.getByTestId('card-container-' + i)
        }

        //checking if not more than 3 is showing
        expect(screen.queryByTestId('card-container-3')).toBeNull()
        expect(screen.queryByTestId('card-container-4')).toBeNull()
    })

    it('shows correct data in each cards', () => {
        setup()
        const dummyRes = server_dummy_api_response

        //testing if all individual data are showing correctly
        for (let i = 0; i < dummyRes.length; i++) {
            expect(screen.getByTestId('origin-city-code-' + i).textContent).toBe(dummyRes[i].origin)
            expect(screen.getByTestId('destination-city-code-' + i).textContent).toBe(dummyRes[i].destination)

            expect(screen.getByTestId('price-' + i).textContent).toBe(
                dummyRes[i].price.amount + ' ' + dummyRes[i].price.currency
            )
            expect(screen.getByTestId('seat-' + i).textContent).toBe(
                dummyRes[i].seatAvailability + ' ' + 'seats available'
            )

            expect(screen.getByTestId('departure-date-' + i).textContent).toBe(
                convertSvrDateToUiDate(dummyRes[i].departureDate)
            )
            expect(screen.getByTestId('return-date-' + i).textContent).toBe(
                convertSvrDateToUiDate(dummyRes[i].returnDate)
            )
        }
    })
})
