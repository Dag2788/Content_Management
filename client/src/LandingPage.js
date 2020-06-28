import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import ApiCollection from "./app/components/ApiCollection";

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
    // window.FB.getLoginStatus((response) => {
    //   if (response.status !== "connected"){
    //     this.setState({loggedIn : false})
    //   }
    // });
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
  this.setState({
    loggedIn: false,
  });
//   window.FB.logout((response) => {
//     if (response.status !== "connected"){
//       this.setState({
//         loggedIn: false,
//       });
//     }
//  });
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
            <ApiCollection />
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