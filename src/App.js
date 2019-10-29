import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/pages/home"
import Profile from "./components/pages/profile"

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-root">
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Header/>
            <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/profile" component={Profile}/>
                </Switch>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
