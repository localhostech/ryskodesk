const {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  BrowserRouter,
  Redirect
} = ReactRouterDOM;

import {Navbar} from "../components/template.js"

class TaskBlock extends React.Component {

  render() {
    return (
      <div className="col-lg-3 col-xl-2">
        <div className="card">
            <div className="card-block">
              <h4 className="card-title">{this.props.title}</h4>
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
      tasks: []
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
    fetch("/getTasks",
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
    var tasksRow = [];
    this.state.tasks.forEach(function(item, i) {
      item.till = new Date(item.till);
      console.log(item.till, typeof item.till);
      item.till = item.till.getDate()+'.'+item.till.getMonth()+'.'+item.till.getFullYear();
      tasksRow.push(<TaskBlock key={item._id} title={item.title} description={item.description} till={item.till} price={item.price} />);
    })
    return (
      <div>
        <Navbar />
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
      till: '',
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
        <Navbar />
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
                    <input type="date" className="form-control" name="till" value={this.state.till} onChange={this.handleInputChange} placeholder="Дата выполнения"/>
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
