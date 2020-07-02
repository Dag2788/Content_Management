import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

let endpoint = "http://localhost:8080";

type Props = {
    fb_id: string,
  };

class CreateAccount extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        fb_id: this.props.fb_id,
        isRegistered: false,
        username: '',
        password: '',
      }
  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        let { fb_id, username, password } = this.state; 
        console.log("Creating user for ", fb_id, " + ", username);
        if (fb_id && username && password) {
          axios.post(endpoint + "/api/task",{fb_id,username,password},{headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(res => {
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
        let { isRegistered } = this.state
        if(isRegistered){
            return <Redirect to='/content' />
            }
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <label>Name:</label>
                            <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
                        </div>
                    </div>
                    <div className="row">
                         <div className="input-field col s12">
                            <label>Password:</label>
                            <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
      );
    }
  }

export default CreateAccount;