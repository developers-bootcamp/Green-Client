import axios from "axios";

export const getProductsAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
    debugger
    const x= await axios.get(`http://localhost:8081/product` )
    return  (await x).data
    
    }