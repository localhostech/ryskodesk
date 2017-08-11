/*const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter
} = ReactRouterDOM;
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


import {LoginForm, RegisterForm} from "./components/forms.js";
import {DeskMain, DeskAddTask} from "./templates/desk.js";

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={LoginForm}/>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/desk' component={DeskMain}/>
          <Route path='/addtask' component={DeskAddTask}/>
        </Switch>
      </MuiThemeProvider>
    );
  }
}
injectTapEventPlugin();
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app')
);
