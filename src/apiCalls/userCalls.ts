import axios from "axios";
//import {BASE_URL} from '../config/config'
export const getCustomersAutocomplete=async (prefix:string) :Promise<{ [key: string]: any; }[]> =>{
 // const burl=config.get("BASE_URL")


    const config = { headers: { 'Authorization':localStorage.getItem("token") } };
const x= await axios.get(`http://localhost:8081/user/getAllByPrefix/${prefix}` ,config)
return  (await x).data
let c=1;
}
