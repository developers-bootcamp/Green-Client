import axios from "axios";
import IOrder from "../interfaces/model/IOrder"
import { ORDER_URL } from "../config/config";

export const addNewOrder = async (order: IOrder) => {
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const res = await axios.post(`${ORDER_URL}`, order, {
    headers: {
      'Authorization': token
    }
  });
}

export const calculateOrder = async (order: IOrder) => {
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const ans = await axios.post(`${ORDER_URL}/calculate`, order, {
    headers: {
      'Authorization': token
    }
  });
  return await ans.data
}

export const getOrders = async (sortBy: string, pageNo: number, orderStatus: string[]) => {
  let token = localStorage.getItem("token");
  if (token == undefined)
    token = ""
  const config = { headers: { 'Authorization': token } };
  const url = `${ORDER_URL}?orderBy=${sortBy}&orderStatus=${orderStatus}&pageNo=${pageNo}`
  const response = await axios.get(url, config)
  var pagination = response.headers["totalcount"];
  return await response.data
}

export const countOrders = async (orderStatus: string[]) => {
  let t = localStorage.getItem("token");
  if (t == null)
    t = ""
  const config = { headers: { 'Authorization': t } };
  const url = `${ORDER_URL}/count?orderStatus=${orderStatus}`
  const response = await axios.get(url, config)
  return await response.data
}