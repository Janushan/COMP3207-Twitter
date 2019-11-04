import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './styles.css';
export default class TweetCreate extends Component {
    constructor(props) {
        super(props);
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
        this.setState({value: ""})
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Grid>
                    <Paper>
                        <Grid container>
                            <Avatar className="tweet-create-avatar">J</Avatar>
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