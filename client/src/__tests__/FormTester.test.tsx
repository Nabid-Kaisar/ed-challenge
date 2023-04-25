import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IATA } from '../models/IATAType'
import FlightSearchingAppMainContent from '../components/FlightSearchingAppMainContent'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'
import { filterCriteria } from '../constants/CONSTANTS'

const { PRICE } = filterCriteria

const setup = () => {
    const dummyFlightData: PromotionsPriceOffersResponse = {
        origin: 'FRA',
        destination: 'ROM',
        departureDate: '2023-06-31',
        returnDate: '2023-07-16',
        seatAvailability: 23,
        price: { amount: 130, currency: 'Euro' },
        offerType: 'ExactMatch',
        uuid: 'SA00003-b790715d-b2b8-4d23-ac27-d4e88c0e84af',
    }

    const mockHandleCallPromotionPricesApi = jest.fn(async (origin: IATA, destination: IATA) => {})

    const utils = render(
        <FlightSearchingAppMainContent
            handleCallPromotionPricesApi={mockHandleCallPromotionPricesApi}
            filteredFlightData={[dummyFlightData]}
            sortBy={PRICE}
            setSortBy={() => {}}
        />
    )

    const originInput = screen.getByLabelText('Origin')
    const destinationInput = screen.getByLabelText('Destination')

    const submitBtn = screen.getByRole('button')

    return { originInput, destinationInput, submitBtn, mockHandleCallPromotionPricesApi, ...utils }
}

const userEventSetup = () => {
    return {
        user: userEvent.setup(),
    }
}

describe('There should be', () => {
    test(`1. origin and destination labels and input boxes.
                2. a submit button.`, () => {
        //running setup will automatically test if the elements are rendered correctly or not
        const { submitBtn } = setup()

        //labels test
        screen.getByText('Origin')
        screen.getByText('Destination')

        //submit button
        expect(submitBtn.textContent).toBe('Search Flights')
    })
})

describe('input mechanism and form submissions', () => {
    test(`User should not be able to type without-
                String uppercase letters & max 3 digits for both origin and destination`, async () => {
        const { originInput, destinationInput } = setup()

        //both input boxes will be checked for same type of behaviours/validations
        await testInputBoxes(originInput)
        await testInputBoxes(destinationInput)
    })

    test(`1. submit button does not submit form without valid inputs 
                2. submit button submits form successfully upon entering valid inputs`, async () => {
        const { submitBtn, originInput, destinationInput, mockHandleCallPromotionPricesApi } = setup()
        let user = userEventSetup().user
        //initial empty strings -> does not submit
        await user.click(submitBtn)
        expect(mockHandleCallPromotionPricesApi).not.toHaveBeenCalled()

        //assertions for only one field -> does not submit
        await user.type(originInput, 'JKR')
        expect(mockHandleCallPromotionPricesApi).not.toHaveBeenCalled()

        //assertions for two field but invalid length-> does not submit
        await user.type(destinationInput, 'EW')
        await user.click(submitBtn)
        expect(mockHandleCallPromotionPricesApi).not.toHaveBeenCalled()

        //assertions for both field with valid length-> successfully submits
        await user.type(destinationInput, 'R')
        await user.click(submitBtn)
        expect(mockHandleCallPromotionPricesApi).toHaveBeenCalled()
    })
})

const testInputBoxes = async (inpBox: HTMLElement) => {
    //should be initially empty string;
    expect(inpBox.textContent).toBe('')

    const inputExpectedMap = [
        { input: 'a', expected: 'A' },
        { input: 'z', expected: 'Z' },
        { input: 'fRa', expected: 'FRA' },
        { input: 'sfo', expected: 'SFO' },
        { input: 'EWR', expected: 'EWR' },
        // { input: 'JkRRR5z', expected: 'JKR' },
        { input: '', expected: '' },
    ]

    //length validation testing
    let user = userEventSetup().user

    await user.type(inpBox, "234$!0,.:'")
    expect(inpBox).toHaveValue('')

    await user.type(inpBox, 'jKrRzA')
    expect(inpBox).toHaveValue('JKR')

    //clearing test values
    //also prepares for a new test
    await user.clear(inpBox)

    await user.type(inpBox, 'ewrrzzzzzzzzasssssdddd')
    expect(inpBox).toHaveValue('EWR')

    await user.clear(inpBox)

    //validation testing
    inputExpectedMap.forEach((testCase) => {
        fireEvent.change(inpBox, { target: { value: testCase.input } })
        expect(inpBox).toHaveValue(testCase.expected)
    })
}
