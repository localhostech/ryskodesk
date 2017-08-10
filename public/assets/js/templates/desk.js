const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter,
  Redirect
} = ReactRouterDOM;

class DeskMain extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">RYSKO Desk</a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <a className="nav-item nav-link" href="#">Лента заданий <span className="sr-only">(current)</span></a>
          </div>
          <div className="navbar-nav navbar-user-info">
            <a className="nav-item nav-link" href="#">Жданов Григорий</a>
            <a className="nav-item nav-link" href="/logout">Выйти</a>
          </div>
        </div>
      </nav>
    )
  }
}

export {DeskMain};
