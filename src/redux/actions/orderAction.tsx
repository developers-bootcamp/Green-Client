import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { GET_ALL_ORDERS_URL } from '../../config/config';
import IOrder from '../../interfaces/model/IOrder';


//ation types
const FETCH_ALL_ORDERS_REQUEST = 'FETCH_ALL_ORDERS_REQUEST';
const FETCH_ALL_ORDERS_SUCCESS = 'FETCH_ALL_ORDERS_SUCCESS';
const FETCH_ALL_ORDERS_FAILURE = 'FETCH_ALL_ORDERS_FAILURE';

// Action creators
export const fetchAllOrdersRequest: any = () => ({
    type: FETCH_ALL_ORDERS_REQUEST,
})

export const fetchAllOrdersSuccess: any = (orders: IOrder[]) => ({
    type: FETCH_ALL_ORDERS_SUCCESS,
    payload: orders
})

export const fetchAllOrdersFailure: any = (error: string) => ({
    type: FETCH_ALL_ORDERS_REQUEST,
    payload: error
})

export const fetchAllOrders: any = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch(fetchAllOrdersRequest());

        // Make the API call to fetch all orders
        fetch(GET_ALL_ORDERS_URL)
            .then((response) => response.json())
            .then((data) => {
                // Dispatch the success action with the fetched orders
                dispatch<AnyAction>(fetchAllOrdersSuccess(data));
            })
            .catch((error) => {
                // Dispatch the failure action with the error message
                dispatch<AnyAction>(fetchAllOrdersFailure(error.message));
            });
    };
};
