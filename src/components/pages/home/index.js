import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TweetCreate from "../../tweet-create";
import TweetList from "../../tweet-post/tweet-list";
import Auth from "../../../auth";

export default class Home extends Component {
    constructor() {
        super();
        this.id = '';
    }

    componentWillMount() {
        this.id = Auth.getId()
    }
    render() {
        return (
            <div>
                <Grid container direction="column">
                    <TweetCreate/>
                    <Typography variant="h6">Feed</Typography>
                    <TweetList
                        userId={this.id}/>
                </Grid>
            </div>
        )
    }   
}