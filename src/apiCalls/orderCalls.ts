import axios from "axios";
import {IOrder} from "../interfaces/IOrder"
import { BASE_URL } from "../config/config";

export const addNewOrder=async(order:IOrder)=>{

    
    const token = localStorage.getItem("token");
    const req = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token != null ? token : "" },
                body: JSON.stringify(order)
            }
            const d = await fetch(`${BASE_URL}/orders`, req);
}
export const calculateOrder=async(order:IOrder)=>{
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }
    const ans = await fetch(`${BASE_URL}/orders/calculate`, req);
    return await ans.json()
  
}


