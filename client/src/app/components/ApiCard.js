import React from "react";
import { useState } from 'react';
import axios from "axios";

let endpoint = "http://localhost:8080";


function ApiCard(props) {

  let  fb_id  = props.fb_id;
  let isSelected = props.isSelected;
  
  console.log("fb_id: " + fb_id);
  console.log("isSelected: " + isSelected);
  
  const [isSubscribedOn, setSubscribe] = useState(isSelected);
  const subscribe = () => setSubscribe(!isSubscribedOn);

  const [color, setColor] = useState(isSelected);
  const coloring = () => setColor(!color);

  return (
    <div className="col s12 m6 l4">
    <div className={props.class} style={{background: isSubscribedOn ? props.backgroundColor : ''}}>
    <div className="card-image ">
      <i className={props.icon} style={{color: isSubscribedOn ? '#FFF' : ''}}></i>
    </div>
    <div className="card-content">
      <span className="card-title grey-text text-darken-4">
          <button className="btn waves-effect waves-light btn-large subscribe_btn" 
            style={{background: color ? "rgb(104, 55, 178)" : "", border: color ? "1px solid #FFF" : ""}} 
            type="submit" 
            name="action" 
            onClick={() => { subscribe(); coloring(); createAccount(props, isSubscribedOn);}}>
            {isSubscribedOn ? 'SUBSCRIBED!' : 'Subscribe'}
          </button>
      </span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{props.name}<i className="material-icons right">close</i></span>
    </div>
  </div>
  </div>


  );
}

function createAccount(props, isSubscribedOn) {
  let  fb_id  = props.fb_id;
  let name = props.name
  console.log("Creating user for ", fb_id, " service clicked" + name);
  if (fb_id) {
    axios
      .put(endpoint + "/api/task/" + fb_id + "/" + name + "/" + !isSubscribedOn, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        console.log(res);
      });
  }
};

export default ApiCard;
