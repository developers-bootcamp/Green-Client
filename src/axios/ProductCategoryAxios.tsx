import axios from "axios"
import { GET_ALL_PRODUCT_CATEGORY } from "../config/config"

export const getAllCategory=async()=>{
return await axios.get(`${GET_ALL_PRODUCT_CATEGORY}`);
} 