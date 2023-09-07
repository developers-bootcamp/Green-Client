import React from "react"
import { useEffect, useState } from "react";
import GlobalTable from "../../../components/table/GlobalTable";
import { getAllCategory, deleteproductCategory, editProductCategory, addProductCategory } from "../../../apiCalls/productCategory";
import { getUsers, deleteUser, addUser, editUser } from "../../../apiCalls/userCalls";
import { idText } from "typescript";
import { IProductCategory } from "../../../interfaces/model/IProductCategory";
import { IProduct } from "../../../interfaces/model/IProduct";
import { GridPreProcessEditCellProps } from "@mui/x-data-grid";
import arrow from '../../../images/arrow.png'
import arrow2 from '../../../images/arrow2.png'
import arrow3 from '../../../images/arrow3.png'
import { PALLETE } from "../../../config/config";
import IUser from "../../../interfaces/model/IUser";
import { useSelector } from 'react-redux';
import { store, RootState } from '../../../redux/store'
interface prop {
  name: string | undefined,
  type: string | undefined
}
const UsersManagement: React.FC<prop> = ({ name, type }) => {
  const [allCustomers, setAllCustomers] = useState<any>();
  const [allManagers, setAllManagers] = useState<any>();
  const [allEmployees, setAllEmployees] = useState<any>();
  const role = useSelector((state: RootState) => state.roleReducer?.role || "hello");
  const validatePassword = (value: any) => {
    let message = ''
    let specialCharacter = false;
    let number = false;
    let lowercase = false;
    let uppercase = false;
    let a = []
    if (value != undefined) {
      a = value.split('')
      for (let i = 0; i < a.length; i++) {
        if (a[i] >= 'a' && a[i] <= 'z')
          lowercase = true;
        if (a[i] >= 'A' && a[i] <= 'Z')
          uppercase = true
        if (a[i] >= '0' && a[i] <= '9')
          number = true
        if (a[i] == '!' || a[i] == '@' || a[i] == '#' || a[i] == '$' || a[i] == '%' || a[i] == '^' || a[i] == '&' || a[i] == '*' || a[i] == '(' || a[i] == ')')
          specialCharacter = true
      }

      console.log(a, "arr");
    }
    if (!number) {
      message = 'Password must contain at least one number'
    }
    if (!lowercase) {
      message = 'Password must contain at least one lowercase letter'
    }
    if (!uppercase) {
      message = 'Password must contain at least one uppercase letter'
    }
    if (!specialCharacter) {
      message = 'Password must contain at least one special character'
    }
    if (value == undefined || value.length < 8) {
      message = 'Password must be at least 8 characters'
    }
    return message;
  }
  const head = [
    {
      headerName: "FullName", type: "string", field: "fullName", editable: true, preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        let hasError=false;
        let message='';
        if(params.props.value == undefined){
          hasError=true
          message="FullName is required"
        }
        if(params.props.value != undefined&& params.props.value.length < 3){
          hasError=true
          message="min 3 char" 
        }
        return { ...params.props, error: hasError, message: message };
      }
    },
    {
      headerName: "Password", type: "password", editable: true, field: "password", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        let message = validatePassword(params.props.value)
        let hasError = message != ''

        return { ...params.props, error: hasError, message: message };
      }
    },
    { headerName: "Email", type: "string", field: "email", editable: true , preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      let hasError=false;
      let message='';
      if(params.props.value == undefined){
        hasError=true
        message="email is required"
      }
      if(params.props.value != undefined&&(params.props.value.search("@")<0||params.props.value.length<8)){
        hasError=true;
        message="Invalid email address"

      }

      return { ...params.props, error: hasError, message:message};
    }},
    { headerName: "Address", type: "string", field: "address", editable: true },
    { headerName: "Phone", type: "string", field: "telephone", editable: true }]
  const getAllUserAsync = async () => {
    await getUsers().then(res => {
      let managers: any = [];
      let employees: any = [];
      let costumers: any = [];
      res.data.map((u: IUser) => {
        if (u.roleName == "ADMIN")
          managers.push(u)
        if (u.roleName == "EMPLOYEE")
          employees.push(u)
        if (u.roleName == "CUSTOMER")
          costumers.push(u)
      })

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
  const onUserAdd = async (user: IUser, type: string) => {

    user.roleName = type.toUpperCase()
    await addUser(user)
  }

  useEffect(() => {
    getAllUserAsync();




  }, [])
  return (
    <>
      {allManagers != null && allEmployees != null && allCustomers != null && <GlobalTable permission={role} type="Admin" rows={allManagers} number={0} head={head} image={arrow} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.RED} headColor={PALLETE.RED} ></GlobalTable>}
      {allManagers != null && allEmployees != null && allCustomers != null && <GlobalTable permission={role} type="Employee" rows={allEmployees} number={1} head={head} image={arrow3} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.YELLOW} headColor={PALLETE.YELLOW} ></GlobalTable>}
      {allManagers != null && allEmployees != null && allCustomers != null && <GlobalTable permission={role} type="Customer" rows={allCustomers} number={2} head={head} image={arrow2} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.BLUE} headColor={PALLETE.BLUE} ></GlobalTable>}

    </>
  );
};
export default UsersManagement;
