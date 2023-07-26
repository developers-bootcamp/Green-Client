import axios from "axios";
import { BASE_URL, GET_USERS } from "../config/config";
//import {BASE_URL} from '../config/config'
export const getCustomersAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
alert(BASE_URL)
let t=localStorage.getItem("token");
if(t==undefined)
    t="qqq"
const config = { headers: { 'Authorization': t} };
let url=`${GET_USERS}/${prefix}`
alert(url);
const x= await axios.get(url,config);
return  (await x).data;
}
