import {IATA} from "../models/IATAType";
import axios from "axios";
import {BASE_URL} from "../constants/CONSTANTS";

const PromotionsPriceAPI = `${BASE_URL}/api/promotions/priceoffers/ond`;

export const getPromotionsPrices = (origin: IATA, destination: IATA) => {
    //implement the query params will be necessary when working with actual API
    return axios.get(PromotionsPriceAPI + `/${origin}/${destination}`);
}