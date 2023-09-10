import axios from "axios"
import { CURRENCIES_URL } from "../config/config"
export const getCurrencies = async () => {
    return await axios.get(CURRENCIES_URL)
}