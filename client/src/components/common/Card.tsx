import React from 'react'
import { IATA } from '../../models/IATAType'
import airplane_landing from '../../resources/icons/airplane_land.png'
import airplane_takeoff from '../../resources/icons/airplane_up.png'
import { convertSvrDateToUiDate } from '../../util/utils'

const Card: React.FC<CardProps> = ({ origin, destination, departureDate, returnDate, price, seatAvailability }) => {
    return (
        <div className="card-container">
            <div className="od-date-container">
                <div className="origin-dest-container ">
                    <span className="od-value">
                        <img src={airplane_takeoff} style={styles.icons} />
                        {origin}
                    </span>
                    <div className="horizontal-line"> </div>

                    <span className="od-value">
                        <img src={airplane_landing} style={styles.icons} />
                        {destination}
                    </span>
                </div>
                <div className="date-container ">
                    <span className="date-label">Departure Date</span>
                    <span className="date-value">{convertSvrDateToUiDate(departureDate)}</span>
                    <span className="date-label">Return Date</span>
                    <span className="date-value">{convertSvrDateToUiDate(returnDate)}</span>
                </div>
            </div>

            <div className="price-container">{price}</div>
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

const styles = {
    icons: {
        width: '24px',
        height: '24px',
    },
}
