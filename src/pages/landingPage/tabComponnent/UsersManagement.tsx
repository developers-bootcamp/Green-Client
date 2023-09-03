import React from "react"
import { useEffect, useState } from "react";
import GlobalTable from "../../../components/table/GlobalTable";
import { getUsers, deleteUser, addUser, editUser } from "../../../apiCalls/userCalls";
import arrow from '../../../images/arrow.png'
import arrow2 from '../../../images/arrow2.png'
import arrow3 from '../../../images/arrow3.png'
import { PALLETE } from "../../../config/config";
import IUser from "../../../interfaces/model/IUser";

interface prop {
  name: string | undefined,
  type: string | undefined
}
const UsersManagement: React.FC<prop> = ({ name, type }) => {
  const [allCustomers, setAllCustomers] = useState<any>();
  const [allManagers, setAllManagers] = useState<any>();
  const [allEmployees, setAllEmployees] = useState<any>();
  const head = [
    { headerName: "FullName", type: "string", field: "fullName" ,preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      const hasError = params.props.value.length < 3;
      return { ...params.props, error: hasError, message: "min 3 char" };
    }},
    { headerName: "Password", type:"password", field: "password",preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      const hasError = params.props.value.length < 3;
      return { ...params.props, error: hasError, message: "min 3 char" };
    } },
    { headerName: "Email", type: "string", field: "email" },
    { headerName: "Address", type: "string", field: "address" },
    { headerName: "Phone", type: "string", field: "telephone"} ]

  const getAllUserAsync = async () => {
    await getUsers().then(res => {
      let managers: any = [];
      let employees: any = [];
      let costumers: any = [];
      res.data.map((u: IUser) => {
        console.log(u, "user usersManagment");
        if (u.role.name == "ADMIN")
          managers.push(u)
        if (u.role.name == "EMPLOYEE")
          employees.push(u)
           if(u.roleName=="CUSTOMER")
           costumers.push(u)
        })
        console.log(managers);
        
        setAllManagers(managers)
        setAllCustomers(costumers)
        setAllEmployees(employees)
    });

  }
  const onUserDelete = async (id: string) => {

    await deleteUser(id);
  }
  const onUserEdit = async (id: string, user: IUser) => {
    await editUser(id, user)
  }
  const onUserAdd = async (user: IUser,type:string) => {   
     
    user.roleName=type.toUpperCase()
    await addUser(user)
  }

  useEffect(() => {
    getAllUserAsync();
  
    
    
    
  }, [])
  return (
    <>
      {allUser != null && <GlobalTable type="Manager" rows={allManagers} number={0} head={head} image={arrow} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.RED} headColor={PALLETE.RED} ></GlobalTable>}
      {allUser != null && <GlobalTable type="Employee" rows={allEmployees} number={1} head={head} image={arrow3} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.YELLOW} headColor={PALLETE.YELLOW} ></GlobalTable>}
      {allUser != null && <GlobalTable type="Customer" rows={allCustomers} number={2} head={head} image={arrow2} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.BLUE} headColor={PALLETE.BLUE} ></GlobalTable>}
    </>
  );
};
export default UsersManagement;