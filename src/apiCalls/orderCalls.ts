import axios from "axios";
import IOrder from "../interfaces/model/IOrder"
import { ORDER } from "../config/config";

export const addNewOrder = async (order: IOrder) => {
  debugger
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
  debugger
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const ans = await axios.post(`${ORDER}/calculate`, order, {
    headers: {
      'Authorization': token
    }
  });
  console.log(await ans.data)
  return await ans.data

}
export const getOrders=async(sortBy:string,pageNo:number,orderStatus:string[])=>{
  debugger
  console.log("base_url")
  console.log(ORDER)
let token=localStorage.getItem("token");
if (token == undefined)
    token = ""
    const config = { headers: { 'Authorization': token} };
    const url=`${ORDER}?orderBy=${sortBy}&orderStatus=${orderStatus}&pageNo=${pageNo}`
    console.log(url)
    const ans = await axios.get(url,config)
    return await ans.data

}


