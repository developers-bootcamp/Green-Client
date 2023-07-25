import { IOrderItem } from "./IOrderItem";
import { IUser } from "./IUser";

export interface IOrder {
    employeeId: any,
    customerId: IUser,
    totalAmount: number,
    orderItemsList: IOrderItem[],
    orderStatus: string,
    companyId: any,
    creditCardNumber: string,
    expiryOn: Date,
    cvc: string,
    notificationFlag: boolean,
    auditData: any,
    currency:string,
    
}


