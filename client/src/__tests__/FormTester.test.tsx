import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IATA } from '../models/IATAType'
import FlightSearchingAppMainContent from '../components/FlightSearchingAppMainContent'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'

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

    const mockHandleCallPromotionPricesApi = async (origin: IATA, destination: IATA) => {}

    const utils = render(
        <FlightSearchingAppMainContent
            handleCallPromotionPricesApi={mockHandleCallPromotionPricesApi}
            filteredFlightData={[dummyFlightData]}
        />
    )

    const originInput = screen.getByLabelText('Origin')
    const destinationInput = screen.getByLabelText('Destination')

    const submitBtn = screen.getByRole('button')

    return { originInput, destinationInput, submitBtn, ...utils }
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
        const { originInput, destinationInput, submitBtn } = setup()

        //labels test
        screen.getByText('Origin')
        screen.getByText('Destination')

        //submit button
        expect(submitBtn.textContent).toBe('Search Flights')
    })
})

describe('input mechanism and form submission', () => {
    test(`User should not be able to type without
                String uppercase letters & max 3 digits for both origin and destination`, async () => {
        const { originInput, destinationInput, submitBtn } = setup()
        await testInputBoxes(originInput)
        await testInputBoxes(destinationInput)
    })

    test(`submit button does not work`)
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

    // let oriInput = screen.getByText('Origin')

    //length validation testing
    let user = userEventSetup().user

    await user.type(inpBox, 'jKrRzA')
    expect(inpBox).toHaveValue('JKR')

    //clearing test
    //also prepares for a new test
    await user.clear(inpBox)

    await user.type(inpBox, 'ewrrzzzzzzzzasssssdddd')
    expect(inpBox).toHaveValue('EWR')

    //validation testing
    inputExpectedMap.forEach((testCase) => {
        fireEvent.change(inpBox, { target: { value: testCase.input } })
        expect(inpBox).toHaveValue(testCase.expected)
    })
}
