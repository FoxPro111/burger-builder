import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement;
    const inputClass = [classes.InputElement];

    if (props.shoudValidate && props.invalid && props.touched) {
        inputClass.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClass.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClass.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );

            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;