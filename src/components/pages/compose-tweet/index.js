import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

import TweetCreate from "../../tweet-create";

import "./styles.css";

export default class ComposeTweet extends Component {
    render() {
        return (
            <div className="compose-tweet-root">
                <Grid container direction="column">
                    <TweetCreate/>
                </Grid>
            </div>
        )
    }   
}