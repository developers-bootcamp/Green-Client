import axios from "axios";

import { BASE_URL, USERS_URL,SIGN_UP} from "../config/config";
import IUser from "../interfaces/model/IUser";
//import {BASE_URL} from '../config/config'
export const getCustomersAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
let t=sessionStorage.getItem("token");
if(t==undefined)
    t=""
const config = { headers: { 'Authorization': t} };
let url=`${USERS_URL}/${prefix}`

const x= await axios.get(url,config);
return  (await x).data;
}

export const signUp = async (fullName: string, companyName: string, email: string, password: string, currency: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&email=${email}&password=${password}&currency=${currency}`)
}
export const getUsers = async () => {
    let t = sessionStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.get(`${USERS_URL}`, config);
}
export const deleteUser=async(id:string)=>{
    let t=sessionStorage.getItem("token");
    if(t==undefined)
        t="qqq"
        
    const config = { headers: { 'Authorization': t} };
return await axios.delete(`${USERS_URL}/${id}`,config);
} 
export const editUser = async (id:any,product:IUser) => {
    let t = sessionStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        
    const config = {headers: { 'Authorization': t } };

    return await axios.put(`${USERS_URL}/${id}`,product, config);
} 
export const addUser = async (product:IUser) => {
    let t = sessionStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        
    const config = {headers: { 'Authorization': t } };

    return await axios.post(`${USERS_URL}`,product, config);
}  

