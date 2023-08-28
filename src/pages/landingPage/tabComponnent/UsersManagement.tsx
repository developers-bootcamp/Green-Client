import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../../../apiCalls/userCalls";
import { idText } from "typescript";
import { RootState, store } from "../../../redux/store";
import { userSlice } from "../../../redux/slices/UserSlice";
import { useSelector } from "react-redux";
import IUser from "../../../interfaces/model/IUser";
import GlobalTable from "../../../components/table/GlobalTable";
interface prop {
  name: string | undefined;
  type: string | undefined;
}
const UsersManagement: React.FC<prop> = ({ name, type }) => {
  const head = [
    { headerName: "FullName", type: "string", field: "name" },
    { headerName: "password", type: "password", field: "password" },
  ];

  const users = useSelector((state: RootState) => state.userReducer.users);
  const getAllUsersAsync = async () => {
    await getUsers().then((res) => {
      console.log(res);
    });
  };


  const deleteUser = async (id: string) => {
    await deleteUser(id);
  };
  const editUser = async (id: string, user: IUser) => {
    await updateUser(user);

    console.log(id, "catelog manager");
  };
  const addNewUser = async (newUser: any) => {
    console.log(" addcatelog manager");

    await addUser(newUser);
  };

  useEffect(() => {
    getAllUsersAsync();
  }, []);
  return (
    <>
      {users != null && (
        <GlobalTable
          type="user"
          rows={users}
          head={head}
          onDelete={deleteUser}
          onEdit={editUser}
          onAdd={addNewUser}
          color={"#EE696A"}
        ></GlobalTable>
      )}
    </>
  );
};
export default UsersManagement;
