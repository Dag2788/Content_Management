import React, { Component } from "react";
import axios from "axios";
import ApiCard from "./ApiCard";

let endpoint = "http://localhost:8080";

type Props = {
  subscriptions: array,
  fb_id: string
  };

class ApiCollection extends Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        subscriptions: props.subscriptions,
        fb_id: props.fb_id
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
        let { subscriptions, fb_id } = this.props
        console.log(subscriptions)
        console.log(fb_id)

          return (
            <div className="system">
              <h4 style={{"text-align": "center", "color": 'white', "margin-bottom": "50px"}}>Choose your Trendy content!</h4>
              {subscriptions && <div className="row">
                    <ApiCard name="MEDIUM" class="card medium mediumCard" icon="massive medium m icon" backgroundColor="#000000" isSelected={subscriptions[0].issubscribed} fb_id={fb_id} />
                    <ApiCard name="REDDIT" class="card medium redditCard" icon="massive reddit alien icon" backgroundColor="#ff4301" isSelected={subscriptions[1].issubscribed} fb_id={fb_id}/>
                    <ApiCard name="TWITCH" class="card medium twitchCard" icon="massive twitch icon" backgroundColor="#6441a5" isSelected={subscriptions[2].issubscribed} fb_id={fb_id}/>
          </div> }
            </div>
          );
    }
  }

export default ApiCollection;