import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    };
};

export const logoutSucced = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUTE,
        expirationTime
    }
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH,
        email,
        password,
        isSignUp
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};