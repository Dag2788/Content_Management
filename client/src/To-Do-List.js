import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { Card, Icon } from "semantic-ui-react";
import CreateAccount from "./app/components/ CreateAccout";


import "./index.css";
import "./mobile.css";

let endpoint = "http://localhost:8080";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
      loggedIn: false,
      fb_id: "",
      username: "",
      password: "",
      isRegistered: false,
      needsAccount: false
    };

  }

  componentDidMount() {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected"){
        this.setState({loggedIn : true})
      }
  });
   // this.getTask();
  }


 facebookSignIn = async () => {
  await window.FB.login((response) =>{
    if (response.status === "connected"){
      console.log(response)
      this.setState({
        loggedIn : true,
        task: "Test Task",
        items: [],
        fb_id: response.authResponse ? response.authResponse.userID : "",
        username: "Dan",
        password: "Test",
        subscriptions: [false, false, false,],
      })
      this.isRegisteredUser()
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

  isRegisteredUser = () => {
    let { fb_id } = this.state; 
    console.log("pRINTING task", this.state.task);
    if(!fb_id){
      return;
    }
    if (fb_id) {
      axios.get(endpoint + "/api/checkAccount/" + fb_id).then(res => {
          console.log(res);
          if(res.data){
            let user = res.data[0];
            if( user.username && user.password){
              this.setState({
                isRegistered: true,
              });
            }
          }
          else {
            this.setState({
              needsAccount: true
            });
          }
          console.log(res);
        }).catch(err => {
          console.log(err);

        });

    }
  };


  createAccount = () => {
    let { task, fb_id, username, password, subscriptions } = this.state; 
    console.log("pRINTING task", this.state.task);
    if (fb_id && username && password) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task,
            fb_id,
            username,
            password,
            subscriptions
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
        }).catch(err => {
          console.log(err);

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
   let { loggedIn,  needsAccount, isRegistered, fb_id } = this.state
   if(isRegistered){
    return <Redirect to={`/content/${fb_id}`} />
   }
    return (
    <div className="App">
       <div className="App-content">
      <div>
          <div className="login">
            <div className="header-login">
              <div className="header">
                TRENDY
              </div>
            </div>
            
           {!needsAccount ? (
           <div>
             <div className="header-login">
              <div className="subheader">
                Let Trendy post for you!
              </div>
            </div>
            <div className="facebook-login">
              <button onClick={this.signInsignOut} className="ui facebook button">
                <i className="facebook icon"></i>
                {!loggedIn ?  "Log in With Facebook" : "Log Out" } 
              </button>
            </div>
            </div>) : <CreateAccount fb_id={fb_id} /> }
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default ToDoList;