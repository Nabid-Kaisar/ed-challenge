import React, { ChangeEvent, useState } from 'react'
import { IATA } from '../models/IATAType'
import Input from '../components/common/Input'

const FlightSelectionForm = ({
    handleCallPromotionPricesApi,
    origin,
    setOrigin,
    destination,
    setDestination,
}: FlightSelectionFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        handleCallPromotionPricesApi(origin as IATA, destination as IATA)
            .then((res) => setIsSubmitting(false))
            .catch((err) => setIsSubmitting(false))
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <Input
                        label={'Origin'}
                        type="text"
                        id="origin"
                        name="origin"
                        value={origin}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setOrigin(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <Input
                        label={'Destination'}
                        type="text"
                        id="destination"
                        name="destination"
                        value={destination}
                        onChange={(event: any) => setDestination(event.target.value)}
                        required
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
    setOrigin: (value: ((prevState: string) => string) | string) => void
    destination: IATA
    setDestination: (value: ((prevState: string) => string) | string) => void
}
