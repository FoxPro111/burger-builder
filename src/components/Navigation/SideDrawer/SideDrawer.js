import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const attachedClasses = props.showSideDrawer ? classes.Open : classes.Close;

    return (
        <Aux >
            <Backdrop show={props.showSideDrawer} clicked={props.closed} />
            <div className={[classes.SideDrawer, attachedClasses].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;