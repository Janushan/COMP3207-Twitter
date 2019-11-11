import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {TweetsApi} from '../../api/tweets-api';
import Auth from "../../auth";
import {InitialHelper} from '../../helpers/initialHelper';

import './styles.css';
export default class TweetCreate extends Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.name = '';
        this.username = '';

        this.state = {
            value: '',
            setValue: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    };

    handleSubmit(event) {
        alert('A tweet was submitted: ' + this.state.value);
        this.id = Auth.getId();
        this.name = Auth.getName();
        this.username = Auth.getUsername();

        TweetsApi.createTweet(this.id, this.name, this.username, this.state.value)
            .then(res => {
                console.log(res);
        })
        this.setState({value: ""})
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Grid>
                    <Paper>
                        <Grid container>
                            <Avatar className="tweet-create-avatar">{InitialHelper.getInitial(this.name)}</Avatar>
                            <TextField
                                id="standard-multiline-flexible"
                                variant="outlined"
                                label="What's happening?"
                                multiline
                                rowsMax="4"
                                value={this.state.value}
                                onChange={this.handleChange}
                                className={"tweet-create-textfield"}
                                margin="normal"
                            />
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={!this.state.value} className="tweet-create-button">Tweet</Button>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    };
}