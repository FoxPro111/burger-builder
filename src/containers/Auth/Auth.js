import React, { Component } from 'react';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }


    checkValidation(value, rules = {}) {
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler(event, inputID) {
        const updatedOrderForm = {
            ...this.state.controls,
        }

        const updatedFormElement = updatedOrderForm[inputID];

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);

        updatedOrderForm[inputID] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm,
        });
    }

    render() {
        const inputElements = [];

        for (let el in this.state.controls) {
            inputElements.push(
                <Input
                    changed={(event) => this.inputChangeHandler(event, el)}
                    key={el}
                    elementType={this.state.controls[el].elementType}
                    elementConfig={this.state.controls[el].elementConfig}
                    value={this.state.controls[el].value}
                    invalid={!this.state.controls[el].valid}
                    shoudValidate={this.state.controls[el].validation}
                    touched={this.state.controls[el].touched}
                    label={this.state.controls[el].label} />
            );
        }

        let form = (
            <form>
                {inputElements}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}
            </div>
        );
    }
};

export default Auth;