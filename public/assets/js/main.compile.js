const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter
} = ReactRouterDOM;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A login was submitted: ' + this.state.login + ', a password: ' + this.state.password);
    event.preventDefault();
  }

  renderLoginForm() {
    ReactDOM.render(React.createElement(LoginForm, null), document.getElementById('app'));
  }

  render() {
    return React.createElement(
      'div',
      { className: 'login-form' },
      React.createElement(
        'h4',
        null,
        '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F'
      ),
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.login, name: 'login', onChange: this.handleInputChange, type: 'text', placeholder: '\u041B\u043E\u0433\u0438\u043D' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.email, name: 'email', onChange: this.handleInputChange, type: 'text', placeholder: 'Email' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.firstname, name: 'firstname', onChange: this.handleInputChange, type: 'text', placeholder: '\u0418\u043C\u044F' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.lastname, name: 'lastname', onChange: this.handleInputChange, type: 'text', placeholder: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            null,
            '\u0421\u0442\u0430\u0442\u0443\u0441'
          ),
          React.createElement(
            'select',
            { className: 'form-control', value: this.state.status, name: 'status', onChange: this.handleInputChange, type: 'text' },
            React.createElement(
              'option',
              { value: 'manager' },
              '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'
            ),
            React.createElement(
              'option',
              { value: 'admin' },
              '\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            null,
            '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
          ),
          React.createElement(
            'select',
            { className: 'form-control', value: this.state.spec, name: 'spec', onChange: this.handleInputChange, type: 'text' },
            React.createElement(
              'option',
              { value: 'manager' },
              '\u041F\u043E\u0441\u0442\u044B'
            ),
            React.createElement(
              'option',
              { value: 'admin' },
              '\u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442'
            ),
            React.createElement(
              'option',
              { value: 'admin' },
              '\u0412\u0441\u0435'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.password, onChange: this.handleInputChange, name: 'password', type: 'password', placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'btn btn-primary', type: 'submit', value: '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            NavLink,
            { exact: true, to: '/' },
            '\u0412\u0445\u043E\u0434'
          )
        )
      )
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A login was submitted: ' + this.state.login + ', a password: ' + this.state.password);
    event.preventDefault();
  }

  renderRegisterForm() {
    ReactDOM.render(React.createElement(RegisterForm, null), document.getElementById('app'));
  }

  render() {
    return React.createElement(
      'div',
      { className: 'login-form' },
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.login, name: 'login', onChange: this.handleInputChange, type: 'text', placeholder: '\u041B\u043E\u0433\u0438\u043D' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.password, onChange: this.handleInputChange, name: 'password', type: 'password', placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { autoComplete: 'off', className: 'btn btn-primary', type: 'submit', value: '\u0412\u043E\u0439\u0442\u0438' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            NavLink,
            { exact: true, to: '/register' },
            '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F'
          )
        )
      )
    );
  }
}
class App extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { exact: true, path: '/', component: LoginForm }),
        React.createElement(Route, { path: '/register', component: RegisterForm })
      )
    );
  }
}

ReactDOM.render(React.createElement(
  BrowserRouter,
  null,
  React.createElement(App, null)
), document.getElementById('app'));