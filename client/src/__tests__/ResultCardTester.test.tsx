import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IATA } from '../models/IATAType'
import FlightSearchingAppMainContent from '../components/FlightSearchingAppMainContent'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import server_dummy_api_response from './server_dummy_response_partial.json'

const setup = () => {
    const dummyApiRes = server_dummy_api_response

    const mockHandleCallPromotionPricesApi = jest.fn(async (origin: IATA, destination: IATA) => {})

    const utils = render(
        <FlightSearchingAppMainContent
            handleCallPromotionPricesApi={mockHandleCallPromotionPricesApi}
            filteredFlightData={dummyApiRes as Array<PromotionsPriceOffersResponse>}
        />
    )

    return { ...utils }
}

const userEventSetup = () => {
    return {
        user: userEvent.setup(),
    }
}

describe('card view of available flights showing correct data', () => {
    it('shows correct number of cards of data, if  form submission successful and api has data', async () => {
        setup()

        //checking if 3 api response data has been rendered to the dom
        for (let i = 0; i < 3; i++) {
            screen.getByTestId('card-container-' + i)
        }

        //checking if not more than 3 is showing
        expect(screen.queryByTestId('card-container-3')).toBeNull()
        expect(screen.queryByTestId('card-container-4')).toBeNull()
    })
})
