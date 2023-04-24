import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IATA } from '../models/IATAType'
import Input from '../components/common/Input'
import { IATA_STRING_LENGTH } from '../constants/CONSTANTS'
import { isValidFlightForm } from '../util/utils'

const FlightSelectionForm = ({
    handleCallPromotionPricesApi,
    origin,
    setOrigin,
    destination,
    setDestination,
}: FlightSelectionFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const firstInpRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!isValidFlightForm(origin, destination)) return

        setIsSubmitting(true)
        handleCallPromotionPricesApi(origin as IATA, destination as IATA)
            .then((res) => setIsSubmitting(false))
            .catch((err) => setIsSubmitting(false))
    }

    useEffect(() => firstInpRef.current?.focus(), [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        ref={firstInpRef}
                        label={'Origin'}
                        id={'origin'}
                        name="origin"
                        value={origin}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setOrigin(event.target.value)}
                        required
                        maxLength={IATA_STRING_LENGTH}
                        minLength={IATA_STRING_LENGTH}
                    />
                </div>
                <div>
                    <Input
                        label={'Destination'}
                        id={'destination'}
                        name="destination"
                        value={destination}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setDestination(event.target.value)}
                        required
                        maxLength={IATA_STRING_LENGTH}
                        minLength={IATA_STRING_LENGTH}
                    />
                </div>
                <button disabled={isSubmitting} className="submit-button" type="submit">
                    Search Flights
                </button>
            </form>
        </div>
    )
}

export default FlightSelectionForm

interface FlightSelectionFormProps {
    handleCallPromotionPricesApi: (origin: IATA, destination: IATA) => Promise<void>
    origin: IATA
    setOrigin: (value: string) => void
    destination: IATA
    setDestination: (value: string) => void
}
