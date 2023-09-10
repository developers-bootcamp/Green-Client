const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOG_IN = `${BASE_URL}/user`;
const SIGN_UP = `${BASE_URL}/user/signUp`;

const USERS_URL = `${BASE_URL}/user`;
const ORDERS_URL = `${BASE_URL}/order`;
const PRODUCTS_URL = `${BASE_URL}/product`;
const PRODUCT_CATEGORY_URL = `${BASE_URL}/productCategory`
const CURRENCIES_URL = `${BASE_URL}/currency`;
const GET_TOP_PRODUCT = `${BASE_URL}/graph/topProduct`;
const GET_DELIVER_CANCEL_ORDERS = `${BASE_URL}/graph/getDeliverCancelOrders`;
const GET_TOP_EMPLOYEE = `${BASE_URL}/graph/topEmployee`;
const GET_DASHBOARD_GENERATOR = `${BASE_URL}/graph/dynamicGraph`
export { GET_TOP_PRODUCT,GET_DELIVER_CANCEL_ORDERS, GET_TOP_EMPLOYEE,GET_DASHBOARD_GENERATOR,BASE_URL,LOG_IN, USERS_URL, ORDERS_URL, PRODUCTS_URL, PRODUCT_CATEGORY_URL, CURRENCIES_URL,SIGN_UP }

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}
