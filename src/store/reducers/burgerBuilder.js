import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.3
};

const initState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    builing: false
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: state.ingredients[action.name] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.name],
        builing: true,
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: state.ingredients[action.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.name],
        builing: true,
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        builing: false,
    };
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return { ...state, error: true };
        default: return state;
    }
}

export default reducer;