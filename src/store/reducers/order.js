import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerFailed = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderID
    };

    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: false
    };
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return { ...state, purchased: true };
        case actionTypes.PURCHASE_BURGER_START: return { ...state, loading: true, };
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerFailed(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return { ...state, loading: false, };
        case actionTypes.FETCH_ORDERS_START: return { ...state, loading: true };
        case actionTypes.FETCH_ORDERS_SUCCESS: return { ...state, orders: action.orders, loading: false };
        case actionTypes.FETCH_ORDERS_FAILED: return { ...state, loading: false };
        default: return state;
    }
}

export default reducer;