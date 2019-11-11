import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import uuid from 'uuidv4';

import {ProfileApi} from '../../../../api/profile-api';
import {SleepHelper} from '../../../../helpers/sleepHelper';
import Auth from '../../../../auth';

import "./styles.css";
import { Typography } from '@material-ui/core';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.name = '';
        this.username= '';
        this.hash='';

        this.state = {
            value: '',
            setValue: '',
            password: '',
            showPassword: false,
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        data: [],
    }

    handleEmailChange(event) {
        this.setState({value: event.target.value})
    };

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    };
    
    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    checkApi() {
        ProfileApi.checkUsernameExists(this.state.value)
        .then(res => {
            console.log(res);
            this.setState({ data: res.data});
            res.data.map(person => {
                this.username = person.username;
                this.id = person.id;
                this.name = person.name;
                this.hash = person.hash;
                console.log(person);
            });
        });
    }
    
    handleCredentialsCheck() {
        if (this.username === this.state.value && this.hash === uuid.fromString(this.state.password)) {
            console.log("same");
            return true;
        } else {
            console.log(this.username);
            console.log(this.state.value);
            return false;
        }
    }

    handleSubmit = () => {
        this.checkApi();
        SleepHelper.sleep(1000).then(() => {
            if (this.handleCredentialsCheck()) {
                Auth.login(() => {
                    this.props.history.push("/app");
                    }, this.id, this.name, this.username); 
            } else {
                console.log("oh no");
            }
        })
    }

    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center">
                    <Typography variant="h6">Enter your details below</Typography>
                    <TextField
                        id="user-name"
                        className="login-text-field"
                        label="Username"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleEmailChange}
                        required
                    />
                    <FormControl className="login-text-field">
                        <InputLabel required className="login-input-label" htmlFor="standard-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            label="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password  visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff /> }
                                    </IconButton>
                                </InputAdornment>
                            } labelWidth={70} >
                        </OutlinedInput>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Login
                    </Button>
                </Grid>
            </div>
        )
    }   
}