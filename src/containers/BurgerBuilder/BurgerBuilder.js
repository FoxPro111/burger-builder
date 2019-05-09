import React, { useState, useEffect } from 'react';
import axios from '../../axios-order';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients()
    }, []);

    const updatePurchaseState = (allIngredients) => {
        const sum = Object.keys(allIngredients)
            .map(key => {
                return allIngredients[key];
            })
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0);

        return sum > 0
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseHandlerClose = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onPurchasedInit();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...props.ingredients
    };

    for (const ingKey in disabledInfo) {
        disabledInfo[ingKey] = disabledInfo[ingKey] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    clickAdd={props.onIngredientAdded}
                    clickRemove={props.onIngredientRemove}
                    disabled={disabledInfo}
                    purchaseable={updatePurchaseState(props.ingredients)}
                    price={props.totalPrice}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler} />
            </Aux>
        );

        orderSummary = <OrderSummary
            price={props.totalPrice}
            cancelled={purchaseHandlerClose}
            continued={purchaseContinueHandler}
            ingredients={props.ingredients} />;
    }

    return (
        <Aux>
            <Modal show={purchasing} closed={purchaseHandlerClose}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchasedInit: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));