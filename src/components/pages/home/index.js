import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TweetCreate from "../../tweet-create";
import TweetList from "../../tweet-post/tweet-list";
import Auth from "../../../auth";
import {ProfileApi} from "../../../api/profile-api";

export default class Home extends Component {
    constructor() {
        super();
        this.id = '';
    }

    state = {
        followings: [],
        followingsTweets: [],
        userId: null,
    }

    componentDidMount() {
        ProfileApi.getFollowings(this.id)
            .then(res => {
                console.log("followings...")
                console.log(res.data[0].followings);
                this.setState({ followings: res.data[0].followings})
        })
    }

    render() {
        this.id = Auth.getId()
        // var followingsSorted = this.state.followings.slice().sort((a, b) => b.date - a.date)
        return (
            <div>
                <Grid container direction="column">
                    <TweetCreate/>
                    <Typography variant="h6">Feed</Typography>
                    {/* <TweetList userId={this.id} /> */}
                    <ul className="tweet-list-container">
                        {this.state.followings.map(following => (
                            <TweetList 
                                userId={following.id} 
                                key={following.id} 
                            />
                        ))}
                    </ul>
                </Grid>
            </div>
        )
    }   
}