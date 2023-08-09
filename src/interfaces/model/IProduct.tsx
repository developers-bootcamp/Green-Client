import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IProductCategory from "./IProductCategory";

export default interface IProduct {
    id: string,
    name: string,
    desc: string,
    price: number,
    discount: number,
    discountType: string,
    productCategory: IProductCategory,
    inventory: number,
    company: ICompany,
    auditData: IAuditData,
}