import axios from "axios";
import IOrder from "../interfaces/model/IOrder"
import { ORDER } from "../config/config";

export const addNewOrder = async (order: IOrder) => {
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const res = await axios.post(`${ORDER}`, order, {
    headers: {
      'Authorization': token
    }
  });

}
export const calculateOrder = async (order: IOrder) => {
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const ans = await axios.post(`${ORDER}/calculate`, order, {
    headers: {
      'Authorization': token
    }
  });
  return await ans.data

}
export const getOrders=async(sortBy:string,pageNo:number,orderStatus:string[])=>{

let token=localStorage.getItem("token");
if (token == undefined)
    token = ""
    const config = { headers: { 'Authorization': token} };
    const url=`${ORDER}?orderBy=${sortBy}&orderStatus=${orderStatus}&pageNo=${pageNo}`
    const response = await axios.get(url,config)

    return await response.data
}
export const countOrders=async(orderStatus:string[])=>{
  let t=localStorage.getItem("token");
  if(t==null)
  t=""
  const config = { headers: { 'Authorization': t} };
  const url=`${ORDER}/count?orderStatus=${orderStatus}`
  console.log(url)
  const response = await axios.get(url,config)
  return await response.data
}
