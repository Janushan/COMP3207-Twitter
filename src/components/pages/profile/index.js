import React, {Component } from 'react';

import Grid from '@material-ui/core/Grid';

import TweetList from '../../tweet-post/tweet-list';
import ProfileInfo from './profile-info';
import {ProfileApi} from '../../../api/profile-api';
import SimpleTabs from '../../simple-tabs';
import FollowingProfile from '../../profle-list';
import FollowerProfile from '../../profle-list';

import LoadingSpinner from '../../../assets/loading-spinner.gif';
import "./styles.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFollowing: true,
            loading: false,
            profile: [],
            userId: 1
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isFollowing: !state.isFollowing
        }));
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        ProfileApi.getProfile(this.state.userId)
            .then(res => {
                console.log(res);
                this.setState({ profile: res.data})
        });
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                { this.state.loading && <p>loading... <img src={LoadingSpinner} alt="Loading spinner" /></p> }
                { !this.state.loading && 
                    <div className="profile-spacing">
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
                            <SimpleTabs 
                                tabOneLabel={"All Tweets"}
                                tabTwoLabel={"Following"} 
                                tabThreeLabel={"Followers"} 
                                tabOnePanel={<TweetList userId={profile.id}/>}
                                tabTwoPanel={<FollowingProfile name={"janu"} username={"@janu"} bio={"life is life"} />}
                                tabThreePanel={<FollowerProfile name={"janu"} username={"@janu"} bio={"life is life"} />} />
                        </div>
                        ))}
                    </div>}
            </Grid>
        )
    }   
}