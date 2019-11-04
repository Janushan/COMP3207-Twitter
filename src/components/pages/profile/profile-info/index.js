import React, {Component } from 'react';
import * as PropTypes from "prop-types";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

import { Link } from 'react-router-dom';

import {InitialHelper} from "../../../../helpers/initialHelper"

import "./styles.css";

export default class ProfileInfo extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        bio: PropTypes.string,
        created: PropTypes.string,
        following: PropTypes.string,
        followers: PropTypes.string
    };

    static defaultProps = {
        id: "",
        name: "Loading...",
        username: "Loading...",
        bio: "",
        created: "2019-11-02T15:11:55.078Z",
        following: "--",
        followers: "--"
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: true,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isFollowing: !state.isFollowing
        }));
    }

    render() {
        const { id, name, username, bio, created, followingCount, followerCount } = this.props;
        var moment = require('moment');
        const initial = InitialHelper.getInitial(name);
        
        return (

            <div className="profile-info-root" key={id}>
                <Grid container direction="column" alignItems="center">
                    <Paper className="profile-paper">
                        <Grid className="profile-avatar-row profile-row-small " container alignItems="center">
                            <Avatar className="profile-avatar">{initial}</Avatar>
                            <Button 
                                onClick={this.handleClick} 
                                variant={this.state.isFollowing ? "outlined" : "contained"} 
                                color="primary"
                            >
                                {this.state.isFollowing ? 'Follow' : 'Following'}
                            </Button>
                        </Grid>
                        <Grid className="profile-row" container>
                            <Grid container>
                                <Typography className="profile-author-name" variant="body1">{name}</Typography>
                            </Grid>
                            <Grid container>
                                <Typography className="profile-author-username" variant="body1">@{username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid className="profile-row" container>
                            <Typography>{bio}</Typography>
                        </Grid>
                        <Grid className="profile-row-small" container alignItems="center">
                            <DateRangeOutlinedIcon color="secondary" className="profile-calendar-icon"/>
                            <Typography className="tweet-post-author-info" variant="body1">{moment(created).fromNow()}</Typography>
                        </Grid>
                        <Grid container>
                            <Link>
                                <Grid container>
                                    <Typography className="profile-emphasis-number" variant="body1">{followingCount}</Typography>
                                    <Typography className="profile-emphasis-number-label" variant="body1">Following</Typography>
                                </Grid>
                            </Link>
                            <Typography className="profile-emphasis-number" variant="body1">{followerCount}</Typography>
                            <Typography className="profile-emphasis-number-label" variant="body1">Followers</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        )
    }   
}