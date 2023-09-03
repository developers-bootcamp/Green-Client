import axios from "axios"
import { PRODUCT_CATEGORY_URL } from "../config/config"
import { IProductCategory } from "../interfaces/model/IProductCategory";

export const getAllCategory=async()=>{
    return await axios.get(`${PRODUCT_CATEGORY_URL}`);
} 

export const deleteproductCategory=async(id:string)=>{
    return await axios.delete(`${PRODUCT_CATEGORY_URL}/${id}`);
} 

export const editProductCategory = async (id:any,productCategory:IProductCategory) => {
    return await axios.put(`${PRODUCT_CATEGORY_URL}/${id}`,productCategory);
} 

export const addProductCategory = async (productCategory:IProductCategory) => {
    return await axios.post(`${PRODUCT_CATEGORY_URL}`,productCategory);
} 