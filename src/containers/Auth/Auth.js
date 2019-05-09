import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { updateObject, checkValidation } from '../../shared/utility';


const auth = props => {
    const [controls, setControls] = useState({
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
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, []);

    const inputChangeHandler = (event, inputID) => {
        const updatedControls = updateObject(controls, {
            [inputID]: updateObject(controls[inputID], {
                value: event.target.value,
                touched: true,
                valid: checkValidation(event.target.value, controls[inputID].validation)
            })
        });

        setControls(updatedControls);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthMethodHandler = (event) => {
        event.preventDefault();

        setIsSignUp(!isSignUp);
    };

    const inputElements = [];

    for (let el in controls) {
        inputElements.push(
            <Input
                changed={(event) => inputChangeHandler(event, el)}
                key={el}
                elementType={controls[el].elementType}
                elementConfig={controls[el].elementConfig}
                value={controls[el].value}
                invalid={!controls[el].valid}
                shoudValidate={controls[el].validation}
                touched={controls[el].touched}
                label={controls[el].label} />
        );
    }

    let form = (
        <form onSubmit={onSubmitHandler}>
            {inputElements}
            <Button btnType="Success">SUBMIT</Button>
            <Button btnType="Danger" clicked={switchAuthMethodHandler}>SWITCH TO {isSignUp ? 'SINGIN' : 'SIGNUP'}</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>);
    }

    let authRedirect;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(auth);