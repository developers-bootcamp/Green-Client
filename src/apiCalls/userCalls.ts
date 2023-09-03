import axios from "axios";
import { LOG_IN, SIGN_UP, USER_URL } from "../config/config";
import IUser from "../interfaces/model/IUser";

export const getCustomersAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = ""
    const config = { headers: { 'Authorization': t } };
    let url = `${USER_URL}/${prefix}`

    const x = await axios.get(url, config);
    return (await x).data;
}

export const signUp = async (fullName: string, companyName: string, email: string, password: string, currency: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&email=${email}&password=${password}&currency=${currency}`)
}

export const logIn = async (email: string, password: string) => {
    return await axios.get(`${LOG_IN}/${email}/${password}`)
}

export const getUsers = async () => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.get(`${USER_URL}`, config);
}

export const deleteUser = async (id: string) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };
    return await axios.delete(`${USER_URL}/${id}`, config);
}

export const editUser = async (id: any, product: IUser) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };

    return await axios.put(`${USER_URL}/${id}`, product, config);
}

export const addUser = async (product: IUser) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };

    return await axios.post(`${USER_URL}`, product, config);
}