import IAuditData from "./IAuditData";

export default interface ICompany {
    id: string,
    name: string,
    currency: number,
    auditData: IAuditData,
}