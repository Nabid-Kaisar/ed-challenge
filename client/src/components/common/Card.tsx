import React from 'react'
import { IATA } from '../../models/IATAType'

const Card: React.FC<CardProps> = ({ origin, destination, departureDate, returnDate, price, seatAvailability }) => {
    return (
        <div className="card-container">
            <div className="od-date-container">
                <div className="origin-dest-container ">
                    <span className="od-value">{origin}</span>
                    <span className="od-value">{destination}</span>
                </div>
                <div className="date-container ">
                    <span className="date-label">Departure Date:</span>
                    <span className="date-value">{departureDate}</span>
                    <span className="date-label">Return Date:</span>
                    <span className="date-value">{returnDate}</span>
                </div>
            </div>

            <div className="price-container">${price}</div>
            <div className="seat-availability-container">{seatAvailability} seats available</div>
        </div>
    )
}

export default Card
interface CardProps {
    origin: IATA
    destination: IATA
    departureDate: string
    returnDate: string
    price: string
    seatAvailability: number
}
