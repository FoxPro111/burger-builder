import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    console.log(props);

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => (
            [...Array(props.ingredients[igKey])].map((_, i) => (
                <BurgerIngredient key={igKey + i} type={igKey} />
            ))
        ))
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please, start adding ingredients.</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(Burger);