import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';

import {Navbar} from "../components/template.js"

import injectTapEventPlugin from 'react-tap-event-plugin';

window.tasks = [];

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: 5};

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
    var firstletters = null;
    if (this.state.user.firstname) {
      firstletters = this.state.user.firstname[0]+this.state.user.lastname[0];
    }
    return (
      <IconMenu
        iconButtonElement={
          <Avatar
            color="#fff"
            backgroundColor="#607D8B"
            size={40}
            style={style}
            className="user-avatar"
          >{firstletters}</Avatar>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Профиль" />
        <MenuItem primaryText={<a href="/logout">Выйти</a>} />
      </IconMenu>
    )
  }
}

class TaskBlock extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask() {
    var data = {"taskid": this.props.taskid};
    var context = this;
    fetch("/removeTask",
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      //console.log(data);
      context.props.handler();
    })
  }

  render() {
    var taskControls = null;
    return (
      <div className="col-lg-3 col-xl-2">
        <div className="card">
            <div className="card-block">
              <h4 className="card-title">{this.props.title}</h4>
              <span onClick={this.deleteTask} className="lnr lnr-cross delete-task"></span>
              <p className="card-text">
              {this.props.description}<br/>
              Стоимость: {this.props.price} руб.<br/>
              Сделать до: {this.props.till}<br/>
              </p>
              <a href="#" className="btn btn-primary">Открыть</a>
            </div>
        </div>
      </div>
    )
  }
}

class DeskMain extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      user: {},
      tasks: tasks,
      open: true
    };

    this.updateTasks = this.updateTasks.bind(this);
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
      window.user = data;
      context.setState({
        user: data,
      });
    })

    fetch("/getTasks",
    {
        method: "POST",
        body: "{}",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      //console.log(data);
      context.setState({
        tasks: data,
      });
    })
  }

  updateTasks() {
    var context = this;

    fetch("/getTasks",
    {
        method: "POST",
        body: "{}",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      //console.log(data);
      context.setState({
        tasks: data,
      });
    })
  }

  render() {
    let addTask = null;
    if (this.state.user.status == "admin"){
      addTask = (<div className="col-lg-3 col-xl-2">
        <div className="card">
            <div className="card-block">
              <h4 className="card-title">Добавить задачу</h4>
              <p className="card-text">
              </p>
              <NavLink exact to="/addtask" className="btn btn-primary">Добавить</NavLink>
            </div>
        </div>
      </div>)
    }
    var context = this;
    var tasksRow = [];
    this.state.tasks.forEach(function(item, i) {
      tasksRow.push(<TaskBlock key={item._id} taskid={item._id} title={item.title} handler={context.updateTasks} author={item._author} description={item.description} till={item.till} price={item.price} />);
    })
    return (
      <div>
        <AppBar
          title="RYSKO Desk"
          iconElementRight={<UserNavbar />}
        />
        <div className="container-fluid">
          <div className="task-list">
            <div className="row">
              {tasksRow}
              {addTask}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class DeskAddTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      till: new Date(),
      fireRedirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.goToMain = this.goToMain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  goToMain(event) {
    event.preventDefault();
    this.props.history.push('/desk');
  }

  handleInputChange(event, date) {
    if (!date) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    } else {
      this.setState({
        ['till']: date
      });
    }
  }

  handleSubmit(event) {
    console.log(this.state);
    var context = this;
    var data = new FormData();
    data.append( "json", JSON.stringify( this.state ) );


    fetch("/addtask",
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
    event.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
      <div>
        <AppBar
          title="RYSKO Desk"
          onTitleTouchTap={this.goToMain}
          iconElementRight={<UserNavbar />}
        />
        <div className="container-fluid">
          <div className="add-task">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Заголовок" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" name="price" value={this.state.price} onChange={this.handleInputChange} placeholder="Стоимость" />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="description"  value={this.state.description} placeholder="Описание"  onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <DatePicker hintText="Дата выполнения" value={this.state.till} onChange={this.handleInputChange} container="inline" />
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Сохранить"/>
                  </div>
                </form>
                {fireRedirect && (
                  <Redirect to={from || '/desk'}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {DeskMain, DeskAddTask};
