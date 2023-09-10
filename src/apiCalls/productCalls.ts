import axios from "axios";
import { IProduct } from "../interfaces/model/IProduct";
import { PRODUCTS_URL } from "../config/config";

export const getProductsAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
    let t = sessionStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return (await axios.get(`${PRODUCTS_URL}/${prefix}`, config)).data;
}

export const getProducts = async () => {
    return await axios.get(`${PRODUCTS_URL}`);
}

export const deleteProduct = async (id: string) => {
    return await axios.delete(`${PRODUCTS_URL}/${id}`);
}

export const editProduct = async (id: any, product: IProduct) => {
    return await axios.put(`${PRODUCTS_URL}/${id}`, product);
}

export const addProduct = async (product: IProduct) => {
    return await axios.post(`${PRODUCTS_URL}`, product);
}  