import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div key={props.label} className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.clickRemove} className={classes.Less} disabled={props.disabled}>Less</button>
            <button onClick={props.clickAdd} className={classes.More}>More</button>
        </div>
    );
};

export default buildControl;