import {IProduct} from "./IProduct";

export default interface IOrderItem {
    product: IProduct,
    amount: number,
    quantity: number,
}
