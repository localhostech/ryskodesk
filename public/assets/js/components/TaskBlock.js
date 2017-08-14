import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
export class TaskBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      doneopen: false,
      message: ''
    }
    this.handleTaskPage = this.handleTaskPage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDoneClose = this.handleDoneClose.bind(this);
    this.handleDoneOpen = this.handleDoneOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.doneTask = this.doneTask.bind(this);
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
    var data = {"taskid": this.props.taskid, "message":this.state.message};
    var context = this;
    fetch("/doneTask",
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
      context.handleDoneClose();
    })

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
  messageHandler(event) {
    console.log(event.target.value);
    this.setState({message:event.target.value});
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
          {this.props.message && this.props.message.length > 0 && "Выполнено: "+this.props.message}
            </p>
          </CardText>
          {this.props.admins && <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Вы действительно хотите удалить задание?
          </Dialog>}
          <Dialog
            actions={doneActions}
            modal={false}
            open={this.state.doneopen}
            onRequestClose={this.handleDoneClose}
          >
            Введите сообщение для ответсвенного<br></br>
            <TextField
              hintText="Ответсвенный за проверку выполнения увидит это сообщение."
              multiLine={true}
              rows={2}
              rowsMax={4}
              onChange={this.messageHandler}
            />
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
