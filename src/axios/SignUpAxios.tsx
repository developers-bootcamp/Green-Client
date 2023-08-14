import axios from "axios";
import { SIGN_UP } from "../config/config";

export const signUp = async (fullName: string, companyName: string, email: string, password: string, currency: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&email=${email}&password=${password}&currency=${currency}`)
}