import IAuditData from "./IAuditData";
import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

export default interface IOrder {
    //id:string,
    employee: any,
    customer: IUser,
    totalAmount: number,
    orderItemsList: IOrderItem[],
    orderStatus: string,
    company: any,
    creditCardNumber: string,
    expiryOn: Date,
    cvc: string,
    notificationFlag: boolean,
    auditData: IAuditData,
    currency:string,
    
}
