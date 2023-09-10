
import axios from "axios";
import IOrder from "../interfaces/model/IOrder"
import { ORDERS_URL } from "../config/config";
export const addNewOrder = async (order: IOrder) => {
  debugger
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const res = await axios.post(`${ORDERS_URL}`, order, {
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
  const ans = await axios.post(`${ORDERS_URL}/calculate`, order, {
    headers: {
      'Authorization': token
    }
  });
  console.log(await ans.data)
  return await ans.data
}
export const getOrders=async(sortBy:string,pageNo:number,orderStatus:string[],myMap:Map<string,object>)=>{
  console.log("hello");
  //var MyMap = {"totalAmount":"100-200"}
  
 
  let token=localStorage.getItem("token");
  if (token == undefined)
    token = ""
    let body=['fieldName','totalAmount','filterValue','50']
    const config = { headers: { 'Authorization': token} };

    const url=`${ORDERS_URL}/get?orderBy=totalAmount&orderStatus=${orderStatus}&pageNo=${pageNo}`
    console.log(myMap)
    const response = await axios.post(url, myMap,config)
    return await response.data
}
export const countOrders=async(orderStatus:string[])=>{
  let t=localStorage.getItem("token");
  if(t==null)
  t=""
  const config = { headers: { 'Authorization': t} };
  const url=`${ORDERS_URL}/count?orderStatus=${orderStatus}`
  console.log(url)
  const response = await axios.get(url,config)
  return await response.data
}