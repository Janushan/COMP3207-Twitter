import React, {Component} from 'react';

import FollowProfile from '.';

export default class FollowProfileList extends Component {

    render() {
        return (
            <ul className="tweet-list-container">
                {this.props.people.map(person => (
                    <FollowProfile 
                        key={person.id}
                        name={person.name}
                        username={"@"+person.username}
                        bio={person.bio}
                    />
                ))}
            </ul>
        )
    }
}