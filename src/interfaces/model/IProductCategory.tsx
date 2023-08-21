import IAuditData from "./IAuditData";
import ICompany from "./ICompany";

export default interface IProductCategory {
    id: string,
    name: string,
    desc: string,
    company: ICompany,
    auditData: IAuditData,
}