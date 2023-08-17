import axios from "axios"
import { GET_CURRENCIES } from "../config/config"

export const getCurrencies = async() => {
    return await axios.get(GET_CURRENCIES)
}