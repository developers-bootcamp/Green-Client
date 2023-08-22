import axios from "axios";
import { GET_PRODUCTS,PRODUCT_CALLS } from "../config/config";
import { IProduct } from "../interfaces/model/IProduct";
export const getProductsAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {

    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    const x = await axios.get(`${GET_PRODUCTS}/${prefix}`, config);
    return (await x).data;

}

export const getProducts = async () => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.get(`${GET_PRODUCTS}`, config);
}
export const deleteProduct=async(id:string)=>{
    let t=localStorage.getItem("token");
    if(t==undefined)
        t="qqq"
        console.log(t);
        
    const config = { headers: { 'Authorization': t} };
return await axios.delete(`${PRODUCT_CALLS}/${id}`,config);
} 
export const editProduct = async (id:any,product:IProduct) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        console.log(product);
        
    const config = {headers: { 'Authorization': t } };
console.log(`${PRODUCT_CALLS}/${id}`,product, config,"jkjkjkjkjkjkj");

    return await axios.put(`${PRODUCT_CALLS}/${id}`,product, config);
} 
export const addProduct = async (product:IProduct) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
        console.log(product);
        
    const config = {headers: { 'Authorization': t } };
console.log("hfhhdhsjsjs");

    return await axios.post(`${PRODUCT_CALLS}`,product, config);
}  
