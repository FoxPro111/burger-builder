import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <header>Toolbar, SideDrawer, Backdrop</header>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;