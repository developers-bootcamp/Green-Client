import { Reducer } from 'react';

export interface Order {
    costumer: string,
    product: string
}

const initialState = {
    orders: [],
    errorMessage: "",
    shouldDisplayErrorMessage: false
}

const ordersReducer: Reducer<any, any> = (state, action) => {
    switch (action.type) {
        case 'FETCH_ALL_ORDERS_REQUEST':
            return {} // to decide what to do in each action
        default:
            return state;
    }
}

export default ordersReducer;