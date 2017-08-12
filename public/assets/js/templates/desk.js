import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';
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
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import areIntlLocalesSupported from 'intl-locales-supported';
import { createStore } from 'redux'

let DateTimeFormat;

if (areIntlLocalesSupported(['ru-RU'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru-RU');
}

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {Navbar} from "../components/template.js"

import injectTapEventPlugin from 'react-tap-event-plugin';

import {TaskBlock} from '../components/TaskBlock';
import {FooterNav} from '../components/FooterNav';

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
    var badgeStyle = {"padding":"0px", "verticalAlign": "top",
    "marginTop": "-12px",
    "marginRight": "10px","color":"#fff"};
    return (
      <div>
      <IconMenu
        iconButtonElement={
          <Badge
            badgeContent={10}
            secondary={true}
            style={badgeStyle}
            badgeStyle={{top: 0, right: 0}}
          >
            <IconButton tooltip="Уведомления">
              <NotificationsIcon color="#fff" />
            </IconButton>
          </Badge>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Уведомление 1" />
        <MenuItem primaryText="Уведомление 2" />
        <MenuItem primaryText="Уведомление 3" />
      </IconMenu>
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
      addTask = (
      <div className="col-xl-3">
        <Card>

          <CardTitle title="Добавить задание" />
          <CardText>

          </CardText>
          <CardActions>
            <FlatButton label={<NavLink exact to="/addtask">Добавить</NavLink>} />
          </CardActions>
        </Card>
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
      fireRedirect: false,finished: false,
      stepIndex: 0,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.goToMain = this.goToMain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  goToMain(event) {
    event.preventDefault();
    this.props.history.push('/desk');
  }

  handleInputChange = (event) => {
      const target = event.target;
      //console.log(target.name, target.value)
      this.setState({
        [target.name]: target.value
      });
  }

  handleDateChange = (event, date) => {
    this.setState({till: date});
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
        //context.setState({ fireRedirect: true })
      } else {
        alert(result.message.message);
      }
    })
    event.preventDefault();
  }
  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  renderStepActions(step) {
      const {stepIndex} = this.state;

      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            type={stepIndex === 2 ? 'submit' : 'button'}
            label={stepIndex === 2 ? 'Завершить' : 'Далее'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />
          {step > 0 && (
            <FlatButton
              label="Назад"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onTouchTap={this.handlePrev}
            />
          )}
        </div>
      );
    }
  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    const {finished, stepIndex} = this.state;
    return (

      <div>
        <AppBar
          title="RYSKO Desk"
          onTitleTouchTap={this.goToMain}
          iconElementRight={<UserNavbar />}
        />
        <div className="container-fluid">
        <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
          <form onSubmit={this.handleSubmit}>
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Заполнните все необходимые поля</StepLabel>
                <StepContent>
                  <p>
                    Заполните поля задания.
                  </p>
                  <div className="form-group">
                    <TextField name="title" value={this.state.title} onChange={this.handleInputChange} hintText="Заголовок"  />
                  </div>
                  <div className="form-group">
                    <TextField type="number" name="price" value={this.state.price} onChange={this.handleInputChange} hintText="Стоимость"  />
                  </div>
                  <div className="form-group">
                    <TextField multiLine={true}
                    rows={2}
                    rowsMax={4} name="description" value={this.state.description} onChange={this.handleInputChange} floatingLabelText="Описание" hintText="Описание"  />
                  </div>
                  <div className="form-group">
                    <DatePicker DateTimeFormat={DateTimeFormat} locale="ru-RU" okLabel="ОК" cancelLabel="Отмена" hintText="Дата выполнения" value={this.state.till} onChange={this.handleDateChange} floatingLabelText="Дата выполнения" container="inline" />
                  </div>
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Назначьте роли</StepLabel>
                <StepContent>
                  <p>Роли в задании играют немаловажное значение!</p>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Сохраните задание</StepLabel>
                <StepContent>
                  <p>
                    Мы почти у цели осталось лишь сохранить задание, но перед этим проверьте правильность заполненных полей!<br/>
                    Заголовок: {this.state.title}<br/>
                    Стоимость: {this.state.price}<br/>
                    Описание: {this.state.description}<br/>
                  </p>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </form>
          {fireRedirect && (
            <Redirect to={from || '/desk'}/>
          )}
          {finished && (
            <p style={{margin: '20px 0', textAlign: 'center'}}>
              Задание успешно создано!
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
               Создать еще одно.
              </a>
            </p>
          )}
        </div>
          <div className="add-task">
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export {DeskMain, DeskAddTask};
