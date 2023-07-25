import axios from "axios";
import {IOrder} from "../interfaces/IOrder"
import { BASE_URL } from "../config/config";

export const addNewOrder=async(order:IOrder)=>{

    
    const token = localStorage.getItem("token");
   
            const d = await axios.post(`${BASE_URL}/order`, order);
}
export const calculateOrder=async(order:IOrder)=>{
  
    const ans = await axios.post(`${BASE_URL}/order/calculate`, order);
    return await ans.data()
  
}


