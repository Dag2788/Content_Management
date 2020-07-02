import React from "react";
import { useState } from 'react';

function ApiCard(props) {

    const [isSubscribedOn, setSubscribe] = useState(false)
    const subscribe = () => setSubscribe(!isSubscribedOn)

    const [color, setColor] = useState(false);
    const coloring = () => setColor(!color);

  return (
    <div className="col s12 m6 l4">
    <div className={props.class} style={{background: isSubscribedOn ? props.backgroundColor : ''}}>
    <div className="card-image ">
      <i className={props.icon} style={{color: isSubscribedOn ? '#FFF' : ''}}></i>
    </div>
    <div className="card-content">
      <span className="card-title grey-text text-darken-4">
          <button className="btn waves-effect waves-light btn-large subscribe_btn" style={{background: color ? "rgb(104, 55, 178)" : "", border: color ? "1px solid #FFF" : ""}} type="submit" name="action" 
            onClick={() => { subscribe(); coloring();}}>
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

export default ApiCard;