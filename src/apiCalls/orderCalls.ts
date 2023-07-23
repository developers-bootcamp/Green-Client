import axios from "axios";
import {IOrder} from "../interfaces/IOrder"

export const addNewOrder=async(order:IOrder)=>{
  const  { REACT_APP_BASE_URL } = process.env
    
    const token = localStorage.getItem("token");
    const req = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token != null ? token : "" },
                body: JSON.stringify(order)
            }
            const d = await fetch(`http://localhost:8081/orders`, req);
}
export const calculateOrder=async(order:IOrder)=>{
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }
    const d = await fetch(`http://localhost:8081/orders/calculate`, req);
    const a = await d.json()
    return a;
}


