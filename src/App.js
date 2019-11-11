import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StylesProvider } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {ProtectedRoute} from "./components/protected-route"
import Header from "./components/header";
import Landing from "./components/pages/landing";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import ComposeTweet from "./components/pages/compose-tweet";

import './App.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "#1da1f2",
      light: "#E8EEF8",
      dark: "#0c90e1"
    },
    secondary: {
      main: "#657786",
      light: "#E8EEF8",
      dark: "#2653A6"
    },
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <div className="app-root">
              <Grid
                container
                direction="column"
                alignItems="center"
              >
                <Header/>
                <Switch>
                      <Route path="/" exact component={Landing}/>
                      <ProtectedRoute exact path="/app" component={Home}/>
                      <ProtectedRoute path="/app/profile" component={Profile}/>
                      <ProtectedRoute path="/app/compose/tweet" component={ComposeTweet}/>
                </Switch>
              </Grid>
            </div>
          </Router>
        </StylesProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
