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

import {SleepHelper} from '../../../../helpers/sleepHelper';
import {ProfileApi} from '../../../../api/profile-api';
import Auth from '../../../../auth';

import { Typography } from '@material-ui/core';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.nonEmptyRegex = RegExp('^[a-zA-Z0-9][a-zA-Z0-9s]*^');
        this.exists = true;
        this.id = '';
        this.username = '';
        this.name = '';
        this.state = {
            name: '',
            username: '', 
            bio: '',
            password: '',
            showPassword: false,
            nameError: false,
            usernameError: false,
            bioError: false,
            passwordError: false,
            data: [],
            allValidated: false,
        };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    };
    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    };
    handleBioChange(event) {
        this.setState({bio: event.target.value})
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

    handleErrorChecks()  {
        if(this.state.name === "") {
            this.setState({emailError: false});
            this.setState({nameError: true});
            return false;
        } else if (this.state.username.length < 4) {
            this.setState({emailError: false});
            this.setState({nameError: false});
            this.setState({usernameError: true});
            return false;
        } else if (this.checkUsernameExists()) {
            console.log("this is the problem");
            console.log("T/F: " + this.checkUsernameExists());
            this.setState({emailError: false});
            this.setState({nameError: false});
            this.setState({usernameError: true});
            return false;
        } else if (this.state.bio === "") {
            this.setState({emailError: false});
            this.setState({nameError: false});
            this.setState({usernameError: false});
            this.setState({bioError: true});
            return false;
        } else if (!(this.state.password.length > 3)) {
            this.setState({emailError: false});
            this.setState({nameError: false});
            this.setState({usernameError: false});
            this.setState({bioError: false});
            this.setState({passwordError: true});
            return false;
        } 
        console.log("i'm done");
        this.setState({emailError: false});
        this.setState({nameError: false});
        this.setState({usernameError: false});
        this.setState({bioError: false});
        this.setState({passwordError: false});
        return true
    }

    checkNoError() {
        if (this.state.emailError === false && this.state.nameError === false && this.state.usernameError === false && this.state.bioError === false && this.state.passwordError === false) {
            return  true;
        }
        return false;
    }

    checkApi() {
        ProfileApi.checkUsernameExists(this.state.username)
        .then(res => {
            console.log("checking api...");
            console.log(this.state.username);
            console.log(res);
            this.setState({ data: res.data});
            res.data.map(person => {
                this.username = person.username;
                this.id = person.id;
                this.name = person.name;
                console.log(person);
                console.log("the above is your guy");
            });
        });
    }

    checkUsernameExists() {
        // var bool = true;
        console.log("checking if username exists...")
        this.checkApi();
        SleepHelper.sleep(5000).then(() => {
            console.log("sleeping...");
            if(this.username === this.state.username) {
                console.log("return true");
                this.setState({usernameError: true});
                return true
            } 
            console.log("return false");
            this.setState({usernameError: false});
            return false;
        })
        // return bool;
    }

    handleRegistrationSuccess = () => {
        this.setState({allValidated: false});
        var check = this.handleErrorChecks();
        SleepHelper.sleep(1000).then(() => {
            this.setState({allValidated: !check});
            // correct = this.handleErrorChecks();
            console.log("correct status:");
            console.log(this.state.allValidated);
            // console.log(correct);
        })
        console.log("finished sleeping");
        if (this.state.allValidated && this.checkNoError()) {
        // if (correct) {
            console.log("start the magic");
            this.handleCreateProfile();
            Auth.newLogin(() => {
                this.props.history.push("/app");
                }, 
            this.id, this.state.name, this.state.username); 
        };
        window.scrollTo(0, 0)
        console.log(uuid.fromString(this.state.password));
    }
    
    handleCreateProfile() {
        this.id = uuid();
        ProfileApi.createProfile(this.id, uuid.fromString(this.state.password), this.state.name, this.state.username, this.state.bio)
            .then(res => {
                console.log("creating new profile");
                console.log(res);
        });
    }

    render() {
        return (
            <div>
                <Grid container direction="column" alignItems="center">
                    <Typography variant="h6">Enter your details below</Typography>
                    <TextField
                        id="name"
                        className="login-text-field"
                        label="Name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.nameError ? "Name should not be empty" : "Just a first name is fine"}
                        error={this.state.nameError ? true : false}
                        onChange={this.handleNameChange}
                        required
                    />
                    <TextField
                        id="username"
                        className="login-text-field"
                        label="Username"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.usernameError ? "Username should unique and 4 or more characters" : "This should be unique"}
                        error={this.state.usernameError ? true : false}
                        onChange={this.handleUsernameChange}
                        required
                    />
                    <TextField
                        id="bio"
                        className="login-text-field"
                        label="Bio"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        helperText={this.state.bioError ? "Bio should not be empty" : "Brieflt write about yourself"}
                        error={this.state.bioError ? true : false}
                        onChange={this.handleBioChange}
                        required
                    />
                    <FormControl className="login-text-field" error={this.state.passwordError? true : false}>
                        <InputLabel required className="login-input-label" htmlFor="standard-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="create-password"
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
                        <FormHelperText>Error</FormHelperText>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={this.handleRegistrationSuccess}>
                        Register
                    </Button>
                </Grid>
            </div>
        )
    }   
}