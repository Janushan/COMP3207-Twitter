import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { NavLink, Link } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';

import Auth from '../../auth';

import image from "../../assets/logo.png";

import "./styles.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.username = '';
    }
    
    handleClick() {
        Auth.logout(() => {
            this.props.history.push("/");
        });
    }

    render() {
        return (
            <AppBar className="header-root" position="sticky">
                <Toolbar variant="dense" disableGutters={true}>
                <Grid container alignItems="center" className="header-container">
                    <Grid item className="header-left-container">
                        <Button component={ Link } to="/app" className="header-home-button">
                            <img 
                                src={image} 
                                alt="Twitter Logo" 
                                className="header-image"
                            />
                            <Typography 
                                variant="h6" 
                                className="header-company-name">Twitter
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        {/* {Auth.isAuthenticated() ?  } */}
                        <Button className="header-button-spacing" component={ NavLink } to="/app" exact color="primary" activeClassName="header-nav-active">Feed</Button>
                        <Button className="header-button-spacing" component={ NavLink } to="/app/profile" color="primary" activeClassName="header-nav-active">Profile</Button>
                        <Button className="header-button-spacing" component={ NavLink } to="/app/compose/tweet" color="primary" activeClassName="header-nav-active">Tweet</Button>
                        <Button className="header-button-spacing" component={ NavLink } to="/" color="secondary">Logout</Button>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
        )
    }   
}