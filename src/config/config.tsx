const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOG_IN = `${BASE_URL}/user`;
const SIGN_UP = `${BASE_URL}/user/signUp`;
const GET_CURRENCIES = `${BASE_URL}/currency`;
const USER_URL = `${BASE_URL}/user`
const ORDER_URL = `${BASE_URL}/order`;
const PRODUCT_URL = `${BASE_URL}/product`
const PRODUCT_CATEGORY_URL = `${BASE_URL}/productCategory`

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}

export { BASE_URL, LOG_IN, SIGN_UP, GET_CURRENCIES, USER_URL, ORDER_URL, PRODUCT_URL, PRODUCT_CATEGORY_URL }