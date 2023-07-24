import axios from "axios";
import { BASE_URL } from "../config/config";
export const getProductsAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
    debugger
    const x= await axios.get(`${BASE_URL}/product` )
    return  (await x).data
    
    }