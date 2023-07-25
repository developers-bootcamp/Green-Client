import {IProduct} from "./IProduct"

export  interface IOrderItem{
    productId: IProduct,
    amount: number,
    quantity: number
}