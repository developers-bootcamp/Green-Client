import axios from "axios";
import IUser from "../interfaces/model/IUser"
import { setUsers } from '../redux/slices/UserSlice'; 

import { BASE_URL, GET_USERS, SIGN_UP, USER_URL} from "../config/config";

export const getUsers = async (page: number = 1, pageSize: number = 5): Promise<IUser[]> => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = { headers: { "Authorization": token } };
      const queryParams = `?page=${page}&pageSize=${pageSize}`;
  
      const url = `${USER_URL}${queryParams}`; 
  
      const response = await axios.get(url, config);
debugger
      const users: IUser[] = response.data;
      setUsers(users);
      return users;
    }
     catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  };

export const getCustomersAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
    let t = localStorage.getItem("token");
    if (t == undefined)
        t = ""
    const config = { headers: { 'Authorization': t } };
    let url = `${GET_USERS}/${prefix}`

    const x = await axios.get(url, config);
    return (await x).data;
}

export const signUp = async (fullName: string, companyName: string, email: string, password: string, currency: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&email=${email}&password=${password}&currency=${currency}`)
}

export const addUser = async (user: IUser) => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = { headers: { Authorization: token } };
      
      await axios.post(USER_URL, user, config); 
      
      return true; 
    }

     catch (error) {
      console.error("Error adding user:", error);
      return false; 
    }
  };
  
  export const updateUser = async (user: IUser) => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = { headers: { Authorization: token } };

      await axios.put(USER_URL, user, config); 
  
      return true; 
    } catch (error) {
      console.error("Error updating user:", error);
      return false; 
    }
  };
  
  export const deleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token") || "";
    const config = { headers: { Authorization: token } };

    const url = `${USER_URL}/${userId}`; 

    await axios.delete(url, config);

    return true; 
  } catch (error) {
    console.error("Error deleting user:", error);
    return false; 
  }
};

  



// export const getCustomersAutocomplete = async (prefix: string): Promise<{ [key: string]: any; }[]> => {
//     alert(BASE_URL)
//     let t = localStorage.getItem("token");
//     if (t == undefined)
//         t = "qqq"
//     const config = { headers: { 'Authorization': t } };
//     let url = `${GET_USERS}/${prefix}`
//     alert(url);
//     const x = await axios.get(url, config);
//     return (await x).data;
// }