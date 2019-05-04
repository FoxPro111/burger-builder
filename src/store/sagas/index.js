import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import { initIngredientsSaga } from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUTE, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}