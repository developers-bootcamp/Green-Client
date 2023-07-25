import axios from "axios"
import { SIGN_UP_URL } from "../config/config"

export const signUp = async (fullName: string, companyName: string, currency: string, email: string, password: string) => {
    return await axios.post(`${SIGN_UP_URL}?fullName=${fullName}&companyName=${companyName}&currency=${1}&email=${email}&password=${password}`)
}