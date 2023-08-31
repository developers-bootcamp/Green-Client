import axios from "axios"
import { GET_ALL_PRODUCT_CATEGORY ,DELETE_PRODUCT_CATEGORY,EDIT_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY} from "../config/config"
import { IProductCategory } from "../interfaces/model/IProductCategory";
export const getAllCategory=async()=>{
    let t=localStorage.getItem("token");
    if(t==undefined)
        t="qqq"
    const config = { headers: { 'Authorization': t} };
return await axios.get(`${GET_ALL_PRODUCT_CATEGORY}`,config);
} 
export const deleteproductCategory=async(id:string)=>{
    let t=localStorage.getItem("token");
    if(t==undefined)
        t="qqq"
        
    const config = { headers: { 'Authorization': t} };
return await axios.delete(`${DELETE_PRODUCT_CATEGORY}/${id}`,config);
} 
export const editProductCategory = async (id:any,productCategory:IProductCategory) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        
    const config = {headers: { 'Authorization': t } };

    return await axios.put(`${EDIT_PRODUCT_CATEGORY}/${id}`,productCategory, config);
} 
export const addProductCategory = async (productCategory:IProductCategory) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        
    const config = {headers: { 'Authorization': t } };

    return await axios.post(`${ADD_PRODUCT_CATEGORY}`,productCategory, config);
} 