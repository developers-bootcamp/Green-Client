const BASE_URL = process.env.REACT_APP_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/order`;
const ORDER = `${BASE_URL}/order`
const GET_USERS = `${BASE_URL}/user`;
const GET_PRODUCTS = `${BASE_URL}/product`;
const LOG_IN = `${BASE_URL}/user`;
const SIGN_UP = `${BASE_URL}/user/signUp`;
const GET_CURRENCIES = `${BASE_URL}/currency`;
const GET_TOP_PRODUCT = `${BASE_URL}/graph/topProduct`;
const GET_DELIVER_CANCEL_ORDERS = `${BASE_URL}/graph/getDeliverCancelOrders`;
const GET_TOP_EMPLOYEE = `${BASE_URL}/graph/topEmployee`;

const GET_DASHBOARD_GENERATOR = `${BASE_URL}/graph/dynamicGraph`
const USER_URL = `${BASE_URL}/user`

export { GET_ALL_ORDERS_URL, LOG_IN, BASE_URL, GET_USERS, GET_PRODUCTS, ORDER, SIGN_UP, GET_CURRENCIES, GET_TOP_PRODUCT, GET_DELIVER_CANCEL_ORDERS, GET_TOP_EMPLOYEE,GET_DASHBOARD_GENERATOR, USER_URL}

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}
