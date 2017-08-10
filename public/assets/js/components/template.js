const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter,
  Redirect
} = ReactRouterDOM;

class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    var context = this;
    fetch("/getUser",
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
      //console.log(data);
      context.setState({
        user: data,
      });
    })
  }


  render() {
    return (
      <div className="navbar-nav navbar-user-info">
        <a className="nav-item nav-link" href="#">{this.state.user.firstname} {this.state.user.lastname}</a>
        <a className="nav-item nav-link" href="/logout">Выйти</a>
      </div>
    )
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to="/desk">RYSKO Desk</Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <NavLink exact className="nav-item nav-link" to="/desk">Лента заданий</NavLink>
          </div>
          <UserNavbar name="Григорий Жданов" />
        </div>
      </nav>
    )
  }
}

export {Navbar};
