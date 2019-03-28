import React, { Component } from 'react';
import axios from '../../axios-order';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);

        axios.get('ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error })
            });
    }

    updatePurchaseState(allIngredients) {
        const sum = Object.keys(allIngredients)
            .map(key => {
                return allIngredients[key];
            })
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0);

        this.setState({
            purchaseable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseHandlerClose = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAdditional = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdditional;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        const priceDudaction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDudaction;

        updatedIngredients[type] = updatedCount;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (const ingKey in disabledInfo) {
            disabledInfo[ingKey] = disabledInfo[ingKey] <= 0;
        }

        let orderSummary = null;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                cancelled={this.purchaseHandlerClose}
                continued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        clickAdd={this.addIngredientHandler}
                        clickRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.purchaseHandlerClose}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);