import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
                valid: false
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
                valid: false
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
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    checkValidation(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler(event, inputID) {
        const updatedOrderForm = {
            ...this.state.orderForm,
        }

        const updatedFormElement = updatedOrderForm[inputID];

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);

        console.log(updatedFormElement);

        updatedOrderForm[inputID] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm
        });
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const formData = {};

        for (let field in this.state.orderForm) {
            formData[field] = this.state.orderForm[field].value;
        }

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', data)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
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
                    label={this.state.orderForm[el].label} />
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElements}
                <Button btnType="Success">ORDER</Button>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData;