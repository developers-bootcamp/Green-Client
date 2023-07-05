import axios from 'axios';
import { LOG_IN } from "../config/config"

axios.interceptors.request.use(
    (config: any) => {

        let token = localStorage.getItem("token");
        if (config.url.indexOf(LOG_IN) !== 0 && token) {
            config.headers["Authorization"] = token;
        }
        console.log(config);
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);