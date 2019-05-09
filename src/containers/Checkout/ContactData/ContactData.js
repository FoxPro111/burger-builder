import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

import { updateObject, checkValidation } from '../../../shared/utility';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
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
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangeHandler = (event, inputID) => {
        const updatedOrderElement = updateObject(orderForm[inputID], {
            value: event.target.value,
            touched: true,
            valid: checkValidation(event.target.value, orderForm[inputID].validation)
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputID]: updatedOrderElement
        });

        let formIsValid = true;

        for (let input in updatedOrderForm) {
            if (updatedOrderForm[input].valid !== undefined) {
                formIsValid = formIsValid && updatedOrderForm[input].valid;
            }
        }

        setFormIsValid(formIsValid);
        setOrderForm(updatedOrderForm);
    };

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let field in orderForm) {
            formData[field] = orderForm[field].value;
        }

        const data = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };

        props.onBurgerOrder(data, props.token);
    };

    const inputElements = [];

    for (let el in orderForm) {
        inputElements.push(
            <Input
                changed={(event) => inputChangeHandler(event, el)}
                key={el}
                elementType={orderForm[el].elementType}
                elementConfig={orderForm[el].elementConfig}
                value={orderForm[el].value}
                invalid={!orderForm[el].valid}
                shoudValidate={orderForm[el].validation}
                touched={orderForm[el].touched}
                label={orderForm[el].label} />
        );
    }

    let form = (
        <form onSubmit={orderHandler}>
            {inputElements}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact Data</h4>
            {form}
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));