import React, { Component } from 'react';
import axios from '../../axios-order';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// redux
import { connect } from 'react-redux';
import * as actionsType from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error })
        //     });
    }

    updatePurchaseState = (allIngredients) => {
        const sum = Object.keys(allIngredients)
            .map(key => {
                return allIngredients[key];
            })
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0);

        return sum > 0
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
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (const ingKey in disabledInfo) {
            disabledInfo[ingKey] = disabledInfo[ingKey] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        clickAdd={this.props.onIngredientAdded}
                        clickRemove={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                cancelled={this.purchaseHandlerClose}
                continued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients} />;
        }


        if (this.state.loading) {
            orderSummary = <Spinner />;
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientType) => dispatch({
            type: actionsType.ADD_INGREDIENT,
            ingredientType
        }),
        onIngredientRemove: (ingredientType) => dispatch({
            type: actionsType.REMOVE_INGREDIENT,
            ingredientType
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));