import React from 'react'
import { IATA } from '../../models/IATAType'
import airplane_landing from '../../resources/icons/airplane_land.png'
import airplane_takeoff from '../../resources/icons/airplane_up.png'
import { convertSvrDateToUiDate } from '../../util/utils'

const Card: React.FC<CardProps> = ({
    index,
    origin,
    destination,
    departureDate,
    returnDate,
    price,
    seatAvailability,
}) => {
    return (
        <div data-testid={`card-container-${index}`} className="card-container">
            <div className="od-date-container">
                <div className="origin-dest-container ">
                    <span className="od-value">
                        <img alt="flight starts at" src={airplane_takeoff} style={styles.icons} />
                        <span data-testid={`origin-city-code-${index}`} className="city-code">
                            {origin}
                        </span>
                    </span>
                    <div className="horizontal-line"> </div>

                    <span className="od-value">
                        <img alt="flight arrives at" src={airplane_landing} style={styles.icons} />
                        <span data-testid={`destination-city-code-${index}`} className="city-code">
                            {destination}
                        </span>
                    </span>
                </div>
                <div className="date-container ">
                    <span className="date-label">Departure Date</span>
                    <span data-testid={`departure-date-${index}`} className="date-value">
                        {convertSvrDateToUiDate(departureDate)}
                    </span>
                    <span className="date-label">Return Date</span>
                    <span data-testid={`return-date-${index}`} className="date-value">
                        {convertSvrDateToUiDate(returnDate)}
                    </span>
                </div>
            </div>

            <div data-testid={`price-${index}`} className="price-container">
                {price}
            </div>
            <div data-testid={`seat-${index}`} className="seat-availability-container">
                {seatAvailability} seats available
            </div>
        </div>
    )
}

export default Card
interface CardProps {
    index: number
    origin: IATA
    destination: IATA
    departureDate: string
    returnDate: string
    price: string
    seatAvailability: number
}

const styles = {
    icons: {
        width: '24px',
        height: '24px',
    },
}
