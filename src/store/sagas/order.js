import { put } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());

    yield console.log('test', action.token, action.orderData);

    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());

    const query = '?auth=' + action.token + '&orderBy=\"userId\"&equalTo=\"' + action.userId + '"';

    try {
        const response = yield axios.get('/orders.json' + query);

        const fetchOrders = [];
        for (let key in response.data) {
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFailed(error));
    }
}