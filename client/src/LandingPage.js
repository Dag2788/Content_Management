import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Header } from "semantic-ui-react";

import "./index.css";


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
      loggedIn: true,
    };

  }

  componentDidMount() {
    window.FB.getLoginStatus((response) => {
      if (response.status !== "connected"){
        this.setState({loggedIn : false})
      }
  });
  }


facebookSignIn = () => {
  window.FB.login((response) =>{
    if (response.status === "connected"){
      this.setState({loggedIn : true,
    })
    }
  });
}

facebookSignOut = () => {
  window.FB.logout((response) => {
    if (response.status !== "connected"){
      this.setState({
        loggedIn: false,
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
  render() {
   let { loggedIn } = this.state
    if(!loggedIn){
    return <Redirect to='/' />
    }
    return (
        <div className="App">
        <div className="App-content">
      <div>
          <div className="login">
            <div className="header-login">
              <Header className="header" as="h1" style={{'fontSize': '60px', 'fontFamily': "Comic Sans MS, Comic Sans, cursive", 'color': '#FFF'}}>
                Welcome To Your Landing Page
              </Header>
            </div>
            <div className="header-login">
              <Header className="header" as="h2" style={{'fontSize': '35px', 'fontFamily': "Comic Sans MS, Comic Sans, cursive", 'color': '#e3e3e3'}}>
                Let Trendy post for you!
              </Header>
            </div>
            <div className="facebook-login">
              <button onClick={this.signInsignOut} className="ui facebook button" style={{'width': '400px', 'height': '50px'}}>
                <i className="facebook icon"></i>
                {!loggedIn ?  "Log in With Facebook" : "Log Out" } 
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default LandingPage;