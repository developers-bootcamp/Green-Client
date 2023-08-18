import axios from "axios";
import { GET_PRODUCTS } from "../config/config";
export const getProductsAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
   
    let t=localStorage.getItem("token");
    if(t==undefined)
        t="qqq"
    const config = { headers: { 'Authorization': t} };
    const x= await axios.get(`${GET_PRODUCTS}/${prefix}`,config);
    return  (await x).data;
    
    }