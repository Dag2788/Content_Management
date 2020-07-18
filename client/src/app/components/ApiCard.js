import React from "react";
import { useState } from 'react';
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css'
import TimeKeeper from 'react-timekeeper';

let endpoint = "http://localhost:8080";

function ApiCard(props) {

  let fb_id  = props.fb_id;
  let isSelected = props.isSelected;
  let classes = props.class;
  
  console.log("fb_id: " + fb_id);
  console.log("isSelected: " + isSelected);
  
  const [isSubscribedOn, setSubscribe] = useState(isSelected);
  const subscribe = () => setSubscribe(!isSubscribedOn);

  const [color, setColor] = useState(isSelected);
  const coloring = () => setColor(!color);

  const [time, setTime] = useState('2:00pm');

  const [showTime, setShowTime] = useState(false);

  return (
    <div className="col s12 m6 l4">
      { !showTime && 
      <div className={classes} style={{background: isSubscribedOn ? props.backgroundColor : ''}}>
      <div className="card-image">
        <i className={props.icon} style={{color: isSubscribedOn ? '#FFF' : ''}}></i>
      </div>
      <div className="card-content">
        {
          isSubscribedOn 
          ? 
          <a class="waves-effect waves-light btn-small" onClick={() => { setShowTime(true); }}>{time}
            <i class="material-icons left">access_time</i>
          </a>
          : 
          ''
        }
        <span className="card-title grey-text text-darken-4">
            <button className="btn waves-effect waves-light btn-large subscribe_btn" 
              style={{background: color ? "rgb(104, 55, 178)" : "", border: color ? "1px solid #FFF" : ""}} 
              type="submit" 
              name="action" 
              //onClick={() => { subscribe(); coloring(); createAccount(props, isSubscribedOn);}}>
              onClick={() => { subscribe(); coloring(); !isSubscribedOn ? setShowTime(true) : createAccount(props, false, time); }}>
              {isSubscribedOn ? 'SUBSCRIBED!' : 'Subscribe'}
            </button>
        </span>
      </div>
    </div> 
    } 
    {      
      <div style={{"margin-left":"20px"}}>
        {showTime &&
                    <TimeKeeper
                        time={time}
                        onChange={(newTime) => setTime(newTime.formatted12)}
                        onDoneClick={() => { setShowTime(false); createAccount(props, isSubscribedOn, time); }}
                        switchToMinuteOnHourSelect
                    />
        }
      </div>
    }
  </div>
  );
    }

function createAccount(props, isSubscribedOn, time) {
  let  fb_id  = props.fb_id;
  let name = props.name
  console.log("Creating user for ", fb_id, " service clicked " + name, "time is " + time);
  if (fb_id) {
    axios
      .put(endpoint + "/api/task/" + fb_id + "/" + name + "/" + isSubscribedOn + "/" + time,  {
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

