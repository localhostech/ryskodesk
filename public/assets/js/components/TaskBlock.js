import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
export class TaskBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      doneopen: false
    }
    this.handleTaskPage = this.handleTaskPage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDoneClose = this.handleDoneOpen.bind(this);
    this.handleDoneOpen = this.handleDoneOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.doneTask = this.deleteTask.bind(this);
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
  doneTask() {
    var data = {"taskid": this.props.taskid};
    var context = this;
    /*fetch("/removeTask",
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
    */
  }
  handleOpen() {
    this.setState({open: true});
  }
  handleDoneOpen() {
    this.setState({doneopen: true});
  }
  handleTaskPage() {
    this.props.history.push('/task/'+this.props.taskid);
  }

  handleClose() {
    this.setState({open: false});
  }
  handleDoneClose() {
    this.setState({doneopen: false});
  }
  render() {
    var taskControls = null;
    const actions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Удалить"
        primary={true}
        onTouchTap={this.deleteTask}
      />,
    ];
    const doneActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={this.handleDoneClose}
      />,
      <FlatButton
        label="Отправить"
        primary={true}
        onTouchTap={this.doneTask}
      />,
    ];
    var style= {"marginBottom": "30px"};
    return (
      <div className="col-xl-3">
        <Card className="task-card" style={style}>

          <CardTitle  onTouchTap={this.handleTaskPage} title={this.props.title} subtitle={this.props.description} />
          <CardText  onTouchTap={this.handleTaskPage}>
            <p>

            Стоимость: {this.props.price} руб.<br/>
            Сделать до: {this.props.till}<br/>
            </p>
          </CardText>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Вы действительно хотите удалить задание?
          </Dialog>
          <Dialog
            actions={doneActions}
            modal={false}
            open={this.state.doneopen}
            onRequestClose={this.handleDoneClose}
          >
            Введите сообщение для ответсвенного
          </Dialog>
          <CardActions>
            {this.props.admins && <FlatButton  onTouchTap={this.handleOpen} label="Удалить" />}
            {this.props.implements && <FlatButton  onTouchTap={this.handleDoneOpen} label="Выполнить" />}
          </CardActions>
        </Card>
      </div>
    )
  }
}
