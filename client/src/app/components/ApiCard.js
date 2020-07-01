import React from "react";
import { useState } from 'react';

function ApiCard(props) {

    const [isSubscribedOn, setSubscribe] = useState(false)
    const subscribe = () => setSubscribe(!isSubscribedOn)

    const [color, setColor] = useState(false);
    const coloring = () => setColor(!color);

  return (
    <div class="col s12 m6 l4">
    <div class={props.class} style={{background: isSubscribedOn ? props.backgroundColor : ''}}>
    <div class="card-image ">
      <i class={props.icon} style={{color: isSubscribedOn ? '#FFF' : ''}}></i>
    </div>
    <div class="card-content">
      <span class="card-title grey-text text-darken-4">
          <button class="btn waves-effect waves-light btn-large subscribe_btn" style={{background: color ? "rgb(104, 55, 178)" : "", border: color ? "1px solid #FFF" : ""}} type="submit" name="action" 
            onClick={() => { subscribe(); coloring();}}>
            {isSubscribedOn ? 'SUBSCRIBED!' : 'Subscribe'}
          </button>
      </span>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{props.name}<i class="material-icons right">close</i></span>
    </div>
  </div>
  </div>


  );
}

export default ApiCard;