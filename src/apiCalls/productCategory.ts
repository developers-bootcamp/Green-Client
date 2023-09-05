import axios from "axios"
import { GET_ALL_PRODUCT_CATEGORY ,DELETE_PRODUCT_CATEGORY,EDIT_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY} from "../config/config"
import { IProductCategory } from "../interfaces/model/IProductCategory";
export const getAllCategory=async()=>{
return await axios.get(`${GET_ALL_PRODUCT_CATEGORY}`);
} 
export const deleteproductCategory=async(id:string)=>{
return await axios.delete(`${DELETE_PRODUCT_CATEGORY}/${id}`);
} 
export const editProductCategory = async (id:any,productCategory:IProductCategory) => {
    return await axios.put(`${EDIT_PRODUCT_CATEGORY}/${id}`,productCategory);
} 
export const addProductCategory = async (productCategory:IProductCategory) => {
    return await axios.post(`${ADD_PRODUCT_CATEGORY}`,productCategory);
} 