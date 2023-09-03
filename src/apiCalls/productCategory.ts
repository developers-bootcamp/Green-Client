import axios from "axios"
import { PRODUCT_CATEGORY_URL } from "../config/config"
import { IProductCategory } from "../interfaces/model/IProductCategory";
export const getAllCategory = async () => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"
    const config = { headers: { 'Authorization': t } };
    return await axios.get(`${PRODUCT_CATEGORY_URL}`, config);
}
export const deleteproductCategory = async (id: string) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };
    return await axios.delete(`${PRODUCT_CATEGORY_URL}/${id}`, config);
}
export const editProductCategory = async (id: any, productCategory: IProductCategory) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };

    return await axios.put(`${PRODUCT_CATEGORY_URL}/${id}`, productCategory, config);
}
export const addProductCategory = async (productCategory: IProductCategory) => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = "qqq"

    const config = { headers: { 'Authorization': t } };

    return await axios.post(`${PRODUCT_CATEGORY_URL}`, productCategory, config);
} 