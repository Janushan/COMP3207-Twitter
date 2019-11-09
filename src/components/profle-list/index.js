import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {InitialHelper} from '../../helpers/initialHelper';

import './styles.css';

export default class FollowProfile extends Component {
  static propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
  };

  static defaultProps = {
    name: "",
    username: "",
    bio: "",
  };

  render() {
    const { name, username, bio } = this.props;
    const initial = InitialHelper.getInitial(name);

    return (
      <div className="tweet-post-root">
        <Grid container direction="column" alignItems="center">
          <Paper className="tweet-post-paper">
            <Grid container alignItems="center">
              <Grid item>
                <Avatar>{initial}</Avatar>
              </Grid>
              <Grid item>
                <Grid container>
                  <Typography className="tweet-post-author-name" variant="body1">{name}</Typography>
                </Grid>
                <Grid container>
                    <Typography className="tweet-post-author-info follow-profile-user-info" variant="body1">{username}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Typography className="tweet-post-content follow-profile-bio" variant="body1">{bio}</Typography>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}