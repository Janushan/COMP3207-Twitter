import React, {useState} from 'react';
import TweetPost from '.';

const TweetListOld = () => {
    const [tweets, setTweets] = useState([
        {
            author: {
                name: 'janu',
                username: '@janu',
            },
            created: '21h',
            content: 'Tweet content goes here',
            id: 123
        },
        {
            author: {
                name: 'janu',
                username: '@janu',
            },
            created: '21h',
            content: 'Tweet content blah ablah goes here',
            id: 456
        },
        {
            author: {
                name: 'janu',
                username: '@janu',
            },
            created: '21h',
            content: 'Tweet content maybe goes here',
            id: 789
        }
    ]);
    return (
        <div>
            {tweets.map(tweet => (
                <TweetPost 
                    author={tweet.author.name}
                    username={tweet.author.username}
                    created={tweet.created}
                    content={tweet.content}
                />
            ))}
        </div>
    );
};

export default TweetListOld;