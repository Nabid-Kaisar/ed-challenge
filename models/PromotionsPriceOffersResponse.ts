import {DATE_FORMAT} from "./DateType";
import {IATA} from "./IATAType";

export interface PromotionsPriceOffersResponse{
    origin: IATA; //3 letter IATA City Code
    destination: IATA; //3 letter IATA City Code
    departureDate: DATE_FORMAT;
    returnDate: DATE_FORMAT;
    seatAvailability: number;
    price: Price;
    offerType: string;
    uuid: string;
}

interface Price{
    amount: number;
    currency: string;
}
