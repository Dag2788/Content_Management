import React, { Component } from "react";
import axios from "axios";
import ApiCard from "./ApiCard";

let endpoint = "http://localhost:8080";

type Props = {
  subscriptions: array
  };

class ApiCollection extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        subscriptions: []
      }
    }

    componentDidMount() {
      window.FB.getLoginStatus((response) => {
        if (response.status === "connected"){
          this.setState({loggedIn : true})
        }
    });
    }


    render() {
        let { subscriptions } = this.props
        console.log(subscriptions)
          return (
            <div className="system">
              {subscriptions && <div className="row">
                    <ApiCard name="MEDIUM" class="card medium mediumCard" icon="massive medium m icon" backgroundColor="#000000" isSelected={subscriptions[0].isSubscribed} />
                    <ApiCard name="REDDIT" class="card medium redditCard" icon="massive reddit alien icon" backgroundColor="#ff4301" isSelected={subscriptions[1].isSubscribed}/>
                    <ApiCard name="TWITCH" class="card medium twitchCard" icon="massive twitch icon" backgroundColor="#6441a5" isSelected={subscriptions[2].isSubscribed}/>
          </div> }
            </div>
          );
    }
  }

export default ApiCollection;