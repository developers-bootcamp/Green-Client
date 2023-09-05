import axios from "axios"
import { GET_TOP_PRODUCT, GET_DELIVER_CANCEL_ORDERS, GET_TOP_EMPLOYEE, GET_DASHBOARD_GENERATOR } from "../config/config"

export const topProduct = async() => {
    return await axios.get(`${GET_TOP_PRODUCT}`)
}

export const deliverCancelOrders = async() => {
    return await axios.get(`${GET_DELIVER_CANCEL_ORDERS}`)
}

export const topEmployee = async() => {
    return await axios.get(`${GET_TOP_EMPLOYEE}`)   
}

export const theGenericGraph = async(object:string, field: string ) => {
    return await axios.get(`${GET_DASHBOARD_GENERATOR}/${object}/${field}`)
}