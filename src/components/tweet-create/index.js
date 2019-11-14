import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import TextField from '@material-ui/core/TextField';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Hashtag from "./hashtag";
import {TweetsApi} from '../../api/tweets-api';
import Auth from "../../auth";
import {InitialHelper} from '../../helpers/initialHelper';

import './styles.css';
export default class TweetCreate extends Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.name = '';
        this.username = '';
        this.state = {
            value: '',
            setValue: '',
            showEmojis: false,
        };
        this.editor  = ''
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    };

    showEmojis = event => {
        this.setState(
          {
            showEmojis: true
          },
          () => document.addEventListener("click", this.closeMenu)
        );
      };

    closeMenu = event => {
        console.log(this.emojiPicker);
        if (this.emojiPicker !== null && !this.emojiPicker.contains(event.target)) {
          this.setState(
            {
              showEmojis: false
            },
            () => document.removeEventListener("click", this.closeMenu)
          );
        }
      };

    addEmoji = event => {
        // console.log(e.native);
        let emoji = event.native;
        this.setState({
          value: this.state.value + emoji
        });
      };

    handleSubmit = event => {
        alert('A tweet was submitted: ' + this.state.value);
        TweetsApi.createTweet(this.id, this.name, this.username, this.state.value)
            .then(res => {
                console.log(res);
        })
        this.setState({value: ""})
        event.preventDefault();
    }

    render() {
        this.id = Auth.getId();
        this.name = Auth.getName();
        this.username = Auth.getUsername();
        this.initial = InitialHelper.getInitial(this.name);

        return (
            <div>
                <Grid>
                    <Paper>
                        <Grid container>
                            <Avatar className="tweet-create-avatar">{this.initial}</Avatar>
                            <TextField
                                id="standard-multiline-flexible"
                                variant="outlined"
                                label="What's happening?"
                                multiline
                                rowsMax="4"
                                value={this.state.value}
                                onChange={this.handleChange}
                                className={"tweet-create-textfield"}
                                margin="normal"
                            />
                        </Grid>
                        <Grid container>
                        </Grid>
                        <Grid container className="tweet-create-action-container">
                            <Grid className="tweet-create-left-action-container">
                                <Hashtag />
                                {this.state.showEmojis ? (
                                    <span className="styles.emoji-picker" ref={el => (this.emojiPicker = el)}>
                                        <Picker
                                        onSelect={this.addEmoji}
                                        emojiTooltip={true}
                                        title="Twitter"
                                        />
                                    </span>
                                ) : (
                                    <IconButton className="tweet-create-emoji-button" color="primary" onClick={this.showEmojis}>
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                )}
                            </Grid>
                            <Grid item>
                            <Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={!this.state.value} className="tweet-create-button">Tweet</Button>

                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    };
}