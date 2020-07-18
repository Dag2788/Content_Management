import React, { Component } from "react";
import ApiCard from "./ApiCard";

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
              <h4 style={{"textAlign": "center", "color": 'white', "marginBottom": "50px"}}>Choose your Trendy content!</h4>
              {subscriptions && <div className="row">
                    <ApiCard name="MEDIUM" class="card medium mediumCard" icon="massive medium m icon" backgroundColor="#3d3d3d" isSelected={subscriptions[0].issubscribed} fb_id={fb_id} />
                    <ApiCard name="REDDIT" class="card medium redditCard" icon="massive reddit alien icon" backgroundColor="#ff4301" isSelected={subscriptions[1].issubscribed} fb_id={fb_id}/>
                    <ApiCard name="TWITCH" class="card medium twitchCard" icon="massive twitch icon" backgroundColor="#6441a5" isSelected={subscriptions[2].issubscribed} fb_id={fb_id}/>
          </div> }
            </div>
          );
    }
  }

export default ApiCollection;