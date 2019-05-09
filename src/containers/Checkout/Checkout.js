import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

const checkout = props => {
    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContiuneHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;

    if (props.ingredients) {
        const purhased = props.purchased ? <Redirect to="/" /> : null;

        summary = (
            <div>
                {purhased}
                <CheckoutSummary
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContiuneHandler}
                    ingredients={props.ingredients} />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }

    return summary;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);