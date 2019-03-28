import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        const ingredient = ig.amount ? (<span
            style={{
                textTransform: 'capitalize',
                display: 'block',
                paddingLeft: '10px'
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
            </span>) : null;

        return ingredient;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;