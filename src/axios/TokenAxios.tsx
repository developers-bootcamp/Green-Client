import axios from 'axios';
import { LOG_IN } from "../config/config"

const TokenAxios: React.FC = () => {
    axios.interceptors.request.use(
    (config: any) => {
        let token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = token;
        }
        console.log(config);
        
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    });
    return<>
    </>
}
export default TokenAxios;
