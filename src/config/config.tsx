const BASE_URL = process.env.DASHBOARD_API_BASE_URL;

const GET_ALL_ORDERS_URL = `${BASE_URL}/orders`;

const LOG_IN_URL = `${BASE_URL}/login/logIn`

const SIGN_UP_URL = `${BASE_URL}/user/signUp`

export { GET_ALL_ORDERS_URL, LOG_IN_URL, SIGN_UP_URL }

export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}