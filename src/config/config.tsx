const BASE_URL= process.env.DASHBOARD_API_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;

const LOG_IN = `${BASE_URL}/login/logIn`;
const GET_ALL_PRODUCT_CATEGORY=`${BASE_URL}/productCategory`;


export { GET_ALL_ORDERS_URL, LOG_IN,GET_ALL_PRODUCT_CATEGORY }

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}