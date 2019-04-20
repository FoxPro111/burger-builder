import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

import { updateObject, checkValidation } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false,
    }

    inputChangeHandler(event, inputID) {
        const updatedOrderElement = updateObject(this.state.orderForm[inputID], {
            value: event.target.value,
            touched: true,
            valid: checkValidation(event.target.value, this.state.orderForm[inputID].validation)
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputID]: updatedOrderElement
        });

        let formIsValid = true;

        for (let input in updatedOrderForm) {
            if (updatedOrderForm[input].valid !== undefined) {
                formIsValid = formIsValid && updatedOrderForm[input].valid;
            }
        }

        this.setState({
            formIsValid,
            orderForm: updatedOrderForm,
        });
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let field in this.state.orderForm) {
            formData[field] = this.state.orderForm[field].value;
        }

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onBurgerOrder(data, this.props.token);
    }

    render() {
        const inputElements = [];

        for (let el in this.state.orderForm) {
            inputElements.push(
                <Input
                    changed={(event) => this.inputChangeHandler(event, el)}
                    key={el}
                    elementType={this.state.orderForm[el].elementType}
                    elementConfig={this.state.orderForm[el].elementConfig}
                    value={this.state.orderForm[el].value}
                    invalid={!this.state.orderForm[el].valid}
                    shoudValidate={this.state.orderForm[el].validation}
                    touched={this.state.orderForm[el].touched}
                    label={this.state.orderForm[el].label} />
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));