import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    clickAdd={() => props.clickAdd(control.type)}
                    clickRemove={() => props.clickRemove(control.type)}
                    key={control.label}
                    label={control.label}
                    disabled={props.disabled[control.type]} />
            ))}
            <button
                disabled={!props.purchaseable}
                onClick={props.ordered}
                className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
};

export default BuildControls;