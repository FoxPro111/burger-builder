import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((previusState) => {
            return { showSideDrawer: !previusState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar opened={this.sideDrawerToggleHandler} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;