import IAuditData from "./IAuditData";

export default interface IRole {
    id: string,
    name: string,
    desc: string,
    auditData: IAuditData,
}