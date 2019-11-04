import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TweetCreate from "../../tweet-create";
import TweetList from "../../tweet-post/tweet-list";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Grid container direction="column">
                    <TweetCreate/>
                    <Typography variant="h6">Feed</Typography>
                    <TweetList
                        userId={"1"}/>
                </Grid>
            </div>
        )
    }   
}