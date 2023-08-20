import IAddress from "./IAddress";
import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IRole from "./IRole";

export default interface IUser {
    id: String,
    fullName: String,
    password: String,
    email: String;
    address: IAddress,
    role: IRole,
    companyId: ICompany,
    AuditData: IAuditData,
}