const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter,
  Redirect
} = ReactRouterDOM;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      status: 'manager',
      spec: 'posting',
      fireRedirect: false
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
    console.log(this.state);
    var context = this;
    var data = new FormData();
    data.append( "json", JSON.stringify( this.state ) );

    fetch("/register",
    {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      var result = data.result;
      console.log(result);
      if (result.success) {
        context.setState({ fireRedirect: true })
      } else {
        alert(result.message.message);
      }
    })
    //alert('A login was submitted: ' + this.state.login + ', a password: ' + this.state.password);
    event.preventDefault();
  }

  renderLoginForm() {
    ReactDOM.render(
      <LoginForm />,
      document.getElementById('app')
    );
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
      <div className="login-form">
        <h4>Регистрация</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.login} name="login" onChange={this.handleInputChange} type="text" placeholder="Логин"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.email} name="email" onChange={this.handleInputChange} type="text" placeholder="Email"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.firstname} name="firstname" onChange={this.handleInputChange} type="text" placeholder="Имя"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.lastname} name="lastname" onChange={this.handleInputChange} type="text" placeholder="Фамилия"/>
          </div>
          <div className="form-group">
            <label>Статус</label>
            <select className="form-control" value={this.state.status} name="status" onChange={this.handleInputChange} type="text" >
              <option value="manager">Менеджер</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
          <div className="form-group">
            <label>Специальность</label>
            <select className="form-control" value={this.state.spec} name="spec" onChange={this.handleInputChange} type="text">
              <option value="posting">Посты</option>
              <option value="copyright">Копирайт</option>
              <option value="all">Все</option>
            </select>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" placeholder="Пароль"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="btn btn-primary" type="submit" value="Зарегистрироваться"/>
          </div>
          <div className="form-group">
            <NavLink exact to="/" >Войти</NavLink>
          </div>
        </form>
        {fireRedirect && (
          <Redirect to={from || '/'}/>
        )}
      </div>
    );
  }
}



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fireRedirect: false,
      error: ''
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
    console.log(this.state);
    var context = this;
    var data = new FormData();
    data.append( "json", JSON.stringify( this.state ) );


    fetch("/login",
    {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      var result = data.result;
      console.log(result);
      if (result.success) {
        context.setState({ fireRedirect: true })
      } else {
        alert(result.message.message);
      }
    })
    .catch(function(error) {
        console.log(error);
        context.setState({ error: 'Произошла ошибка. Проверьте введенный логин или пароль.' })
    });
    event.preventDefault();
  }

  renderRegisterForm() {
    ReactDOM.render(
      <RegisterForm />,
      document.getElementById('app')
    );
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
      <div className="login-form">
        <span className="form-error">{this.state.error}</span>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.username} name="username" onChange={this.handleInputChange} type="text" placeholder="Логин"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="form-control" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" placeholder="Пароль"/>
          </div>
          <div className="form-group">
            <input autoComplete="off" className="btn btn-primary" type="submit" value="Войти"/>
          </div>
          <div className="form-group">
            <NavLink exact to="/register" >Зарегистрироваться</NavLink>
          </div>
        </form>
        {fireRedirect && (
          <Redirect to={from || '/desk'}/>
        )}
      </div>
    );
  }
}

export {RegisterForm, LoginForm};
