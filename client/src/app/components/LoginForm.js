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
        fb_id: this.props.fb_id
      }
  
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick1() {
        if (! this.state.account) {
            document.getElementById('container').classList.add("right-panel-active");
        }
    }

    handleClick2() {
        document.getElementById('container').classList.remove("right-panel-active");
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
      this.createAccount()
    }

    createAccount = () => {
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
    let { isRegistered,login, fb_id } = this.state
    if(isRegistered){
        return <Redirect to={`/content/${fb_id}`} />
    }

    return (
            <div class="container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#" onSubmit={this.handleSubmit}> 
                        <p>To keep connected with us please login with your personal info</p>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername}/>
                        <input type="text" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
                        <br /><br />
                        <button type="submit" id="signIn">Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <p>By signing up you indicate that you have read and agree to Trendy's Terms of Service and Privacy Policy.</p>
                        <div className="facebook-login">
                            <button id="signUp" onClick={this.signInsignOut} className="ui facebook button" onClick={() => this.handleClick1()}>
                            <i className="facebook icon"></i>
                            {!login ?  "Log in With Facebook" : "Log Out" } 
                            </button>
                        </div>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                        <h1>Create Account</h1>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>TRENDY</h1>
                            <br/>
                            <h5>Let Trendy post for you!</h5>
                        </div>
                    </div>
                </div>
            </div>
      );
  }
}

export default LoginForm;