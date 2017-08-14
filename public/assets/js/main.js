import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';


import {LoginForm, RegisterForm} from "./components/forms.js";
import {DeskMain, DeskAddTask, DeskTaskPage, DeskUserTasks} from "./templates/desk.js";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pinkA200,
    primary2Color: pinkA200,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    shadowColor: fullBlack,
  }
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path='/' component={LoginForm}/>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/desk' component={DeskMain}/>
          <Route path='/addtask' component={DeskAddTask}/>
          <Route path='/mytasks' component={DeskUserTasks}/>
          <Route path='/task/:taskid' component={DeskTaskPage}/>
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
