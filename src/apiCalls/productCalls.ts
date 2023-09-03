import axios from "axios";
import { PRODUCT_URL } from "../config/config";
import { IProduct } from "../interfaces/model/IProduct";

export const getProductsAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
    return await axios.get(`${PRODUCT_URL}/${prefix}`);
}

export const getProducts = async () => {
    return await axios.get(`${PRODUCT_URL}`);
}

export const deleteProduct=async(id:string)=>{
    return await axios.delete(`${PRODUCT_URL}/${id}`);
} 

export const editProduct = async (id:any,product:IProduct) => {
    return await axios.put(`${PRODUCT_URL}/${id}`,product);
} 

export const addProduct = async (product:IProduct) => {
    return await axios.post(`${PRODUCT_URL}`,product);
}  