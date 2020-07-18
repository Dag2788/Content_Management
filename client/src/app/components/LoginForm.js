import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

let endpoint = "http://localhost:8080";

type Props = {
    login: boolean,
    account: boolean,
    fb_id: String
};

class LoginForm extends Component<Props> {

    constructor(props) {
      super(props);
      this.state = {
        login: this.props.login,
        account: this.props.account,
        fb_id: this.props.fb_id,
        isRegistered: false,
        username: '',
        password: '',
        subscriptions: [{
            name: "MEDIUM",
            isSubscribed: false
          },{
            name: "REDDIT",
            isSubscribed: false
          },{
            name: "TWITCH",
            isSubscribed: false
          },]
      }
  
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.openSignUp = this.openSignUp.bind(this);
    }

    openSignUp(event) {
        event.preventDefault();
        if (! this.state.account) {
            document.getElementById('container').classList.add("right-panel-active");
        }
        this.signInsignOut()
        
    }
  
    handleChangeUsername(event) {
        if(event && event.target && event.target)
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        if(event && event.target && event.target)
        this.setState({password: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.createAccount();
    }

    createAccount() {
        let { fb_id, username, password, subscriptions } = this.state; 
        console.log("Creating user for ", fb_id, " + ", username);
        if (fb_id && username && password) {
          axios.post(endpoint + "/api/task",{fb_id,username,password, subscriptions},{headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(res => {
              this.setState({
                isRegistered: true
              });
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
        }
    };
    
    render() {
    let { isRegistered, login, fb_id } = this.state
    if(isRegistered){
        return <Redirect to={`/content/${fb_id}`} />
    }
    return (
            <div className="container" id="container">
                 <div className="form-container sign-up-container">
                    <form onSubmit={this.handleSubmit}> 
                        <p>To keep connected with us please login with your personal info</p>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername}/>
                        <input type="text" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
                        <br /><br />
                        <button type="submit" id="signIn">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={this.openSignUp}>
                        <h1>Sign in</h1>
                        <p>By signing up you indicate that you have read and agree to Trendy's Terms of Service and Privacy Policy.</p>
                        <div className="facebook-login">
                            <button id="signUp" className="ui facebook button">
                                <i className="facebook icon"></i>
                                {!login ?  "Log in With Facebook" : "Log Out" } 
                            </button>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                        <h1>Create Account</h1>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>TRENDY</h1>
                            <br/>
                            <h5>Let Trendy post for you!</h5>
                        </div>
                    </div>
                </div>
                </div>
      );
  }

  facebookSignIn = async () => {
    await window.FB.login((response) =>{
      if (response.status === "connected"){
        console.log(response)
        this.setState({
          loggedIn : true,
          fb_id: response.authResponse ? response.authResponse.userID : "",
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

}

export default LoginForm;