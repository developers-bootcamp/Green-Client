import IAddress from "./IAddress";
import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IRole from "./IRole";

export default interface IUser {
    id: string,
    fullName: string,
    password: String,
    email: string;
    address: string,
    telephone:string,
    company:ICompany,
    roleName:string,
}