import {DATE_FORMAT} from "./DateType";

interface PromotionsPriceOffersResponse{
    origin: string; //3 letter IATA City Code
    destination: string; //3 letter IATA City Code
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

