import axios from "axios";
import { BASE_URL } from "../config/config";
export const getProductsAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
   
    const config = { headers: { 'Authorization':localStorage.getItem("token") } };
    const x= await axios.get(`${BASE_URL}/user/${prefix}` ,config);
    return  (await x).data
    
    }