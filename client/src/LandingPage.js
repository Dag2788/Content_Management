import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import ApiCollection from "./app/components/ApiCollection";
import "./index.css";


let endpoint = "http://localhost:8080";



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
    // window.FB.getLoginStatus((response) => {
    //   if (response.status !== "connected"){
    //     this.setState({loggedIn : false})
    //   }
    // });
    this.getSubscriptions();
  }


facebookSignIn = () => {
  this.setState({loggedIn : true})
  // window.FB.login((response) =>{
  //   if (response.status === "connected"){
  //     this.setState({loggedIn : true})
  //   }
  // });
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


getSubscriptions = () => {
  console.log(this.props)
  let fb_id = this.props.match.params.id
  console.log("Getting subscriptions for user ", fb_id);
  if (fb_id) {
    axios.get(endpoint + "/api/checkAccount/" + fb_id).then(res => {
        console.log(res);
        if(res.data){
          let user = res.data[0];
          if( user.subscriptions){
            this.setState({
              subscriptions: user.subscriptions,
            });
          }
        }
        console.log(res);
      }).catch(err => {
        console.log(err);

      })
  }
};

  render() {
   let { loggedIn, subscriptions } = this.state
    if(!loggedIn){
    return <Redirect to='/' />
    }
    return (
       <div className="App">
        <div className="App-content">
            <ApiCollection subscriptions={subscriptions}/>
            <div class="row">
              <div className="facebook-logout">
                <button onClick={this.signInsignOut} className="ui facebook button">
                  <i className="facebook icon"></i>
                  {!loggedIn ?  "Log in With Facebook" : "Log Out" } 
                </button>
              </div>
            </div>
         </div>
       </div>
    );
  }
}

export default LandingPage;