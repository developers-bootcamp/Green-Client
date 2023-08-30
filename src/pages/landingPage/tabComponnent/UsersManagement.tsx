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

interface prop {
  name: string | undefined,
  type: string | undefined
}
const UsersManagement: React.FC<prop> = ({ name, type }) => {

  
const[allUser,setAllUser]=useState();
  // const [allCustomers, setAllCustomers] = useState();
  // const [allManagers, setAllManagers] = useState();
  // const [allEmployees, setAllManagers] = useState();
  const head = [{ headerName: "FullName", type: "string", field: "fullName" },{ headerName: "Password", type:"password", field: "password" },{ headerName: "Email", type: "string", field: "email" },{ headerName: "Address", type: "string", field: "address" },{ headerName: "Phone", type: "string", field: "telephone"} ,{headerName:"Date",type:"date",field:"date"}]
  const getAllUserAsync = async () => {
    await getUsers().then(res => {
        res.data.map((u:any)=>u.date=new Date())
      setAllUser(res.data);
    });

  }
  const onUserDelete = async (id: string) => {

    await deleteUser(id);
  }
  const onUserEdit = async (id: string, user: IUser) => {
    // const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };


    console.log(id, "catelog manager");

    await editUser(id, user)
  
  }
  const onUserAdd = async (user: IUser) => {
    // const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };
    console.log(" addcatelog manager");

    await addUser(user)
  }
//   const onProductDelete = async (id: string) => {

//     await deleteProduct(id).then(res => console.log(res.data));
//   }
//   const onProductEdit = async (id: string, product: any) => {
//     const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
//     console.log(id,product, "catelog manager");
//     await editProduct(id, newProduct)
//   }
//   const onProductAdd = async (product: any) => {
//     const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
//     console.log(newProduct," addcatelog manager");

//     await addProduct(newProduct)
//   }
  useEffect(() => {
    getAllUserAsync();
    // getAllCategoryAsync();
  }, [])
  return (
    <>
          {allUser != null && <GlobalTable type="Manager" rows={allUser}number={0} head={head}image={arrow} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.RED}headColor={PALLETE.RED} ></GlobalTable>}
          {allUser != null && <GlobalTable type="Employee" rows={allUser}number={1} head={head}image={arrow3} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.YELLOW}headColor={PALLETE.YELLOW} ></GlobalTable>}
          {allUser != null && <GlobalTable type="Customer" rows={allUser}number={2} head={head}image={arrow2} onDelete={onUserDelete} onEdit={onUserEdit} onAdd={onUserAdd} color={PALLETE.BLUE}headColor={PALLETE.BLUE} ></GlobalTable>}

    </>
  );
};
export default UsersManagement;

