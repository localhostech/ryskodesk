const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter
} = ReactRouterDOM;

import {LoginForm, RegisterForm} from "./components/forms.js";
import {DeskMain, DeskAddTask} from "./templates/desk.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LoginForm}/>
          <Route path='/register' component={RegisterForm}/>
          <Route path='/desk' component={DeskMain}/>
          <Route path='/addtask' component={DeskAddTask}/>
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app')
);
