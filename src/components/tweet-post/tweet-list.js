import React, {Component} from 'react';
import * as PropTypes from "prop-types";

import TweetPost from '.';
import {TweetsApi} from '../../api/tweets-api';

export default class TweetList extends Component {
    static propTypes = {
        userId: PropTypes.string,
    };

    static defaultProps = {
        userId: "0"
    }

    state = {
        tweets: [],
        userId: null,
    }

    componentDidMount() {
        TweetsApi.getTweets(this.props.userId)
            .then(res => {
                console.log(res);
                this.setState({ tweets: res.data})
        })
        
        // Axios.get('https://comp3207-twitter-janu.azurewebsites.net/api/users/1/tweets?code=ZbBnDWznza0LC7aFoJ4Cps0acBxSphfotymXOGz5spIIDfcQwi9OsQ==')
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ tweets: res.data })
        // })
    }

    render() {
        var moment = require('moment');

        return (
            <ul className="tweet-list-container">
                {this.state.tweets.map(tweet => (
                    <TweetPost 
                        key={tweet.id}
                        name={tweet.userName}
                        username={"@"+tweet.userUsername}
                        created={moment(tweet.creationDate).fromNow()}
                        content={tweet.content}
                    />
                ))}
            </ul>
        )
    }
}