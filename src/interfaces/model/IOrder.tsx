import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

export default interface IOrder {
    id: string,
    employee: IUser,
    customer: IUser,
    totalAmount: number,
    orderItemsList: Array<IOrderItem>,
    orderStatusId: string,
    company: ICompany,
    creditCardNumber: number,
    expiryOn: Date,
    cvc: number,
    notificationFlag: number,
    auditData: IAuditData,
}