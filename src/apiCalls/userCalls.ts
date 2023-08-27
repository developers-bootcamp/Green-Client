import axios from "axios";

import { BASE_URL, GET_USERS, SIGN_UP  } from "../config/config";
//import {BASE_URL} from '../config/config'
export const getCustomersAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
let t=localStorage.getItem("token");
if(t==undefined)
    t=""
const config = { headers: { 'Authorization': t} };
let url=`${GET_USERS}/${prefix}`

const x= await axios.get(url,config);
return  (await x).data;

}
export const signUp = async (fullName: string, companyName: string, email: string, password: string, currency: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&email=${email}&password=${password}&currency=${currency}`)

}

// export const getCustomersAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
//     alert(BASE_URL)
//     let t = localStorage.getItem("token");
//     if (t == undefined)
//         t = "qqq"
//     const config = { headers: { 'Authorization': t } };
//     let url = `${GET_USERS}/${prefix}`
//     alert(url);
//     const x = await axios.get(url, config);
//     return (await x).data;
// }