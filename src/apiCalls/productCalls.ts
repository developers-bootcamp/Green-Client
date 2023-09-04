import axios from "axios";
import { GET_PRODUCTS,PRODUCT_CALLS } from "../config/config";
import { IProduct } from "../interfaces/model/IProduct";
export const getProductsAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {

    return await axios.get(`${GET_PRODUCTS}/${prefix}`);

}

export const getProducts = async () => {

    return await axios.get(`${GET_PRODUCTS}`);
}
export const deleteProduct=async(id:string)=>{

return await axios.delete(`${PRODUCT_CALLS}/${id}`);
} 
export const editProduct = async (id:any,product:IProduct) => {

    return await axios.put(`${PRODUCT_CALLS}/${id}`,product);
} 
export const addProduct = async (product:IProduct) => {


    return await axios.post(`${PRODUCT_CALLS}`,product);
}  
