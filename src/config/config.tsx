const BASE_URL = process.env.REACT_APP_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/order`;
const ORDER = `${BASE_URL}/order`
const GET_USERS = `${BASE_URL}/user`;
const GET_PRODUCTS = `${BASE_URL}/product`;
const LOG_IN = `${BASE_URL}/user`
const SIGN_UP = `${BASE_URL}/user/signUp`

export { GET_ALL_ORDERS_URL, LOG_IN, BASE_URL, GET_USERS, GET_PRODUCTS, ORDER, SIGN_UP }

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}
