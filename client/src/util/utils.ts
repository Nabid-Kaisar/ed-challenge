import { alphaOnlyRegExp } from '../constants/CONSTANTS'
import { IATA } from '../models/IATAType'

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
export function isValidFlightForm(origin: IATA, destination: IATA) {
    if (!origin || origin.length !== 3 || !destination || destination.length !== 3) {
        return {
            isValid: false,
            origin: 'invalid',
            destination: 'valid',
        }
    } else if (!origin || origin.length !== 3) {
        return {
            isValid: false,
            origin: 'invalid',
        }
    } else if (!destination || destination.length !== 3) {
        return {
            isValid: false,
            destination: 'invalid',
        }
    } else
        return {
            isValid: true,
        }
}
