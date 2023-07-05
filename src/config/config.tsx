import dotenv from 'dotenv'

dotenv.config();

const BASE_URL= process.env.DASHBOARD_API_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;

const LOG_IN = `${BASE_URL}/login/logIn`

export {GET_ALL_ORDERS_URL, LOG_IN}