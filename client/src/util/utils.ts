import { alphaOnlyRegExp, filterCriteria } from '../constants/CONSTANTS'
import { IATA } from '../models/IATAType'
import { PromotionsPriceOffersResponse } from '../models/PromotionsPriceOffersResponse'

export function isAlphaChars(input: string) {
    return alphaOnlyRegExp.test(input)
}

//this function converts YYYY-MM-DD to DD, month string (DEC,JAN etc.) YYYY
export function convertSvrDateToUiDate(dateStr: string): string {
    const dateObj = new Date(dateStr)
    const year = dateObj.getFullYear()
    const month = dateObj.toLocaleString('default', { month: 'long' })
    const day = dateObj.getDate()
    const formattedDateStr = `${day}, ${month} ${year}`

    return formattedDateStr
}

//is valid flight search form
interface IsValidFlightFormRetType {
    origin: string
    destination: string
    isValid?: boolean
}
export function isValidFlightForm(origin: IATA, destination: IATA): IsValidFlightFormRetType {
    console.log('util fn args, origin::', origin, 'destination::', destination)

    const validationObject: IsValidFlightFormRetType = {
        origin: !origin || origin.length !== 3 ? 'invalid' : 'valid',
        destination: !destination || destination.length !== 3 ? 'invalid' : 'valid',
    }

    if (validationObject.origin === 'valid' && validationObject.destination === 'valid') {
        validationObject.isValid = true
    } else validationObject.isValid = false

    return validationObject
}

//all types of sorting methods goes here
const { DEFAULT, PRICE } = filterCriteria
export function sortFlightData(
    flights: Array<PromotionsPriceOffersResponse>,
    criteria: string,
    CACHED_DATA: Array<PromotionsPriceOffersResponse>
): Array<PromotionsPriceOffersResponse> {
    if (criteria === DEFAULT) {
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

//is an array already sorted
//this method helps the testing method
export function isFlightsArraySorted(flights: Array<PromotionsPriceOffersResponse>) {
    return flights.every((flight, index, array) => {
        if (index === 0) {
            return true
        }
        return flight.price.amount >= array[index - 1].price.amount
    })
}
