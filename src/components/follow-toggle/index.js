import React, {Component } from 'react';
import * as PropTypes from "prop-types";

import Button from '@material-ui/core/Button';

export default class FollowToggle extends Component {
    static propTypes = {
        isFollowing: PropTypes.bool,
    };

    static defaultProps = {
        isFollowing: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFollowing: this.props.isFollowing,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isFollowing: !state.isFollowing
        }));
    }

    render() {
        return (
            <Button 
                onClick={this.handleClick} 
                variant={this.state.isFollowing ? "contained" : "outlined"} 
                color="primary"
            >
                {this.state.isFollowing ? 'Following' : 'Follow'}
            </Button>
        )
    }

}