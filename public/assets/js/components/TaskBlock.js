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
      open: false
    }
    this.handleTaskPage = this.handleTaskPage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  handleOpen() {
    this.setState({open: true});
  }
  handleTaskPage() {
    history.push('/task/'+this.props.taskid);
  }

  handleClose() {
    this.setState({open: false});
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
    var style= {"marginBottom": "30px"};
    return (
      <div className="col-xl-3">
        <Card style={style}>

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
          <CardActions>
            <FlatButton label="Открыть" />
            <FlatButton  onTouchTap={this.handleOpen} label="Удалить" />
          </CardActions>
        </Card>
      </div>
    )
  }
}
