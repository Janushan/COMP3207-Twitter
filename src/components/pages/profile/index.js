import React, {Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TweetList from '../../tweet-post/tweet-list';
import ProfileInfo from './profile-info';
import {ProfileApi} from '../../../api/profile-api';

import "./styles.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: true,
            profile: [],
            userId: 1
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isFollowing: !state.isFollowing
        }));
    }

    componentDidMount() {
        ProfileApi.getProfile(this.state.userId)
            .then(res => {
                console.log(res);
                this.setState({ profile: res.data})
        })
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                {this.state.profile.map(profile => (
                <div key={profile.id}>
                    <ProfileInfo
                        key={profile.id}
                        name={profile.name}
                        username={profile.username}
                        bio={profile.bio}
                        created={profile.creationDate}
                        followingCount={profile.followingCount}
                        followerCount={profile.followerCount}/>
                    <Typography className="profile-header" variant="h6">{profile.name}'s Tweets</Typography>
                    <TweetList
                        userId={profile.id}/>
                </div>
                ))}
            </Grid>
        )
    }   
}