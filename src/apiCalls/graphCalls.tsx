import axios from "axios"
import { GET_TOP_PRODUCT, GET_DELIVER_CANCEL_ORDERS, GET_TOP_EMPLOYEE } from "../config/config"

export const getTopProduct = async() => {
    return await axios.get(`${GET_TOP_PRODUCT}`)
}

export const getDeliverCancelOrders = async() => {
    return await axios.get(`${GET_DELIVER_CANCEL_ORDERS}`)
}

export const getTopEmployee = async() => {
    return await axios.get(`${GET_TOP_EMPLOYEE}`)   
}