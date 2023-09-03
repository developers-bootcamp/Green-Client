import axios from "axios";
import { PRODUCT_URL } from "../config/config";
import { IProduct } from "../interfaces/model/IProduct";

export const getProductsAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    const x = await axios.get(`${PRODUCT_URL}/${prefix}`, config);
    return (await x).data;
}

export const getProducts = async () => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.get(`${PRODUCT_URL}`, config);
}

export const deleteProduct = async (id: string) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.delete(`${PRODUCT_URL}/${id}`, config);
}

export const editProduct = async (id: any, product: IProduct) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.put(`${PRODUCT_URL}/${id}`, product, config);
}

export const addProduct = async (product: IProduct) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.post(`${PRODUCT_URL}`, product, config);
}  
