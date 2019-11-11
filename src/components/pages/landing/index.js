import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';

import LogIn from './log-in';
import Register from './register';

import SimpleTabs from '../../simple-tabs';

export default class Landing extends Component {

    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center">
                    <SimpleTabs
                        tabOneLabel={"Log in"}
                        tabTwoLabel={"Register"}
                        tabOnePanel={<LogIn history={this.props.history}/>}
                        tabTwoPanel={<Register history={this.props.history}/>} />
                </Grid>
            </div>
        )
    }   
}