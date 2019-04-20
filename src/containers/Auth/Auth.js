import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidation } from '../../shared/utility';


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
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler(event, inputID) {
        const updatedControls = updateObject(this.state.controls, {
            [inputID]: updateObject(this.state.controls[inputID], {
                value: event.target.value,
                touched: true,
                valid: checkValidation(event.target.value, this.state.controls[inputID].validation)
            })
        });

        this.setState({
            controls: updatedControls,
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthMethodHandler = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
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
            <form onSubmit={this.onSubmitHandler}>
                {inputElements}
                <Button btnType="Success">SUBMIT</Button>
                <Button btnType="Danger" clicked={this.switchAuthMethodHandler}>SWITCH TO {this.state.isSignUp ? 'SINGIN' : 'SIGNUP'}</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let authRedirect;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token,
        buildingBurger: state.burgerBuilder.builing,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);