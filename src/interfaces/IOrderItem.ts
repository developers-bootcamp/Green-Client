import {IProduct} from "./IProduct"

export  interface IOrderItem{
    product: IProduct,
    amount: number,
    quantity: number
}