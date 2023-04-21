import { alphaOnlyRegExp } from '../constants/CONSTANTS'

export function isAlphaChars(input: string) {
    return alphaOnlyRegExp.test(input)
}
