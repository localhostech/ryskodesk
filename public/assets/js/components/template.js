import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom'
import Avatar from 'material-ui/Avatar';



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
          <UserNavbar />
        </div>
      </nav>
    )
  }
}

export {Navbar};
