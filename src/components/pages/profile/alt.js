import React, {Component } from 'react';

import Grid from '@material-ui/core/Grid';

import TweetList from '../../tweet-post/tweet-list';
import ProfileInfo from './profile-info';
import {ProfileApi} from '../../../api/profile-api';
import SimpleTabs from '../../simple-tabs';
import FollowProfileList from '../../profle-list/profile-list';
import Auth from "../../../auth";

import LoadingSpinner from '../../../assets/loading-spinner.gif';
import "./styles.css";

export default class AltProfile extends Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.state = {
            isFollowing: true,
            loading: false,
            profile: [],
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
        console.log(this.props.match);
        this.id = this.props.match.params.username.substr(1);;
        this.setState({
            loading: true
        });
        ProfileApi.checkUsernameExists(this.id)
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
                                tabTwoLabel={profile.followingCount + " Following"} 
                                tabThreeLabel={profile.followerCount + " Followers"} 
                                tabOnePanel={<TweetList userId={profile.id}/>}
                                tabTwoPanel={<FollowProfileList people={profile.followings} />}
                                tabThreePanel={<FollowProfileList people={profile.followers} />} />
                        </div>
                        ))}
                    </div>}
            </Grid>
        )
    }   
}