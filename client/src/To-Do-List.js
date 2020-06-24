import React, { Component } from "react";
import axios from "axios";
import { Container, Card, Header, Form, Input, Icon } from "semantic-ui-react";

import "./index.css";

let endpoint = "http://localhost:8080";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
      loggedIn: false
    };

  }

  componentDidMount() {
    window.FB.getLoginStatus(function(response) {
      if (response.status === "connected"){
        this.setState({loggedIn : true})
        console.log("what")
      }
  });
    this.getTask();
    console.log("fuck")

  }


facebookSignIn = () => {
  window.FB.login((response) =>{
    if (response.status === "connected"){
      this.setState({loggedIn : true})
    }
  });
}

facebookSignOut = () => {
  window.FB.logout((response) => {
    if (response.status !== "connected"){
      this.setState({
        loggedIn: false
      });
    }
 });
}

signInsignOut = () => {
  let { loggedIn } = this.state;
  if (!loggedIn) {
    this.facebookSignIn();
  }
  else {
    this.facebookSignOut();
  }
}

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { task } = this.state;
    // console.log("pRINTING task", this.state.task);
    if (task) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.getTask();
          this.setState({
            task: ""
          });
          console.log(res);
        });
    }
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
            let color = "yellow";

            if (item.status) {
              color = "green";
            }
            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => this.updateTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() => this.undoTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = id => {
    axios
      .put(endpoint + "/api/task/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  undoTask = id => {
    axios
      .put(endpoint + "/api/undoTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  deleteTask = id => {
    axios
      .delete(endpoint + "/api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };
  render() {
   let { loggedIn } = this.state
    return (
      <div>
          <div className="login">
            <div className="header-login">
              <Header className="header" as="h1" style={{'font-size': '60px', 'font-family': "Comic Sans MS, Comic Sans, cursive", 'color': '#FFF'}}>
                TRENDY
              </Header>
            </div>
            <div className="header-login">
              <Header className="header" as="h2" style={{'font-size': '35px', 'font-family': "Comic Sans MS, Comic Sans, cursive", 'color': '#e3e3e3'}}>
                Let Trendy post for you!
              </Header>
            </div>
            <div className="facebook-login">
              <button onClick={this.signInsignOut} className="ui facebook button" style={{'width': '400px', 'height': '50px'}}>
                <i className="facebook icon"></i>
                {!loggedIn ?  "Log in With Facebook" : "Log Out" } 
              </button>
            </div>
            {/* <div className="tasks">
              <Form onSubmit={this.onSubmit}>
                <Input
                  type="text"
                  name="task"
                  onChange={this.onChange}
                  value={this.state.task}
                  fluid
                  placeholder="Create Task"
                />
              </Form>
            </div>
            <div className="row">
              <Card.Group>{this.state.items}</Card.Group>
            </div> */}
          </div>
        </div>
    );
  }
}

export default ToDoList;