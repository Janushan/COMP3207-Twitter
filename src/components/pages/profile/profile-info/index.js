import React, {Component } from 'react';
import * as PropTypes from "prop-types";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

import {ProfileApi} from '../../../../api/profile-api';
import {InitialHelper} from "../../../../helpers/initialHelper";
import {SleepHelper} from '../../../../helpers/sleepHelper';
import Auth from "../../../../auth";
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
            self: [],
            follow: [],
            selfFollowings: [],
            selfFollowingCount: 0,
            followFollowers: [],
            followFollowerCount: 0,
            followFoundIndex: 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isFollowing: !state.isFollowing
        }));

        if(!this.state.isFollowing) {
            var selfUpdate = this.state.selfFollowings.push(this.state.follow.id, this.state.follow.name, this.state.follow.username, this.state.follow.bio);
            this.setState({ selfFollowings: selfUpdate})
            console.log(this.state.selfFollowings);

            var followingIncrement = this.state.selfFollowingCount;
            followingIncrement++;
            this.setState({ selfFollowingCount: followingIncrement})

            //to self's followings -- add B
            //to self's followingCount -- increment
            //to other's followers -- add A
            //to other's followerCount -- increment

            var followUpdate = this.state.followFollowers.push(this.state.self.id, this.state.self.name, this.state.self.username, this.state.self.bio);
            this.setState({ followFollowers: followUpdate})
            console.log(this.state.followFollowers);

            var followerIncrement = this.state.followFollowerCount;
            followerIncrement++;
            this.setState({ followFollowerCount: followerIncrement})
        }
    }

    checkApi() {
        ProfileApi.checkUsernameExists(Auth.getUsername())
            .then(res => {
                console.log(res);
                this.setState({ self: res.data})
                res.data.map(person => {
                    // console.log(person.followings);
                    this.setState({ selfFollowingCount: person.followingCount})
                    this.setState({ selfFollowings: person.followings})
                })
        });
        ProfileApi.checkUsernameExists(this.props.username)
            .then(res => {
                console.log(res);
                this.setState({ follow: res.data});
                res.data.map(person => {
                    // console.log(person.followings);
                    this.setState({ followFollowerCount: person.followerCount})
                    this.setState({ followFollowers: person.followers})
                    console.log("self followings:");
                    console.log(this.state.selfFollowings);
                })
        });
        
    }

    checkIfFollow() {
        console.log(this.state.self);
        console.log(this.state.selfFollowings); 
        var i;
        for (i = 0; i < this.state.selfFollowings.length; i++) {
          if(this.state.selfFollowings[i].username === this.props.username) {
             console.log("props username");
            console.log(this.props.username);
            this.setState({ followFoundIndex: i});
            //   console.log(this.state.selfFollowings[i].username);
            //   console.log("found it");
            return true;
          }
        }
        return false;
    }

    componentDidMount() {
        this.checkApi();
        var alreadyFollowing = this.checkIfFollow();
        this.setState(state => ({
            isFollowing: alreadyFollowing
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
                            {username === Auth.getUsername() ? "" : 
                                <Button 
                                    onClick={this.handleClick} 
                                    variant={this.state.isFollowing ? "outlined" : "contained"} 
                                    color="primary"
                                >
                                    {this.state.isFollowing ? 'Follow' : 'Following'}
                                </Button>
                            }
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
                    </Paper>
                </Grid>
            </div>
        )
    }   
}