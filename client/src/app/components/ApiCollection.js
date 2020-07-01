import React from "react";
import ApiCard from "./ApiCard";

function ApiCollection() {
  return (
    <div class="system">
        <div class="row">
            <ApiCard name="MEDIUM" class="card medium mediumCard" icon="massive medium m icon" backgroundColor="#000000"/>
            <ApiCard name="REDDIT" class="card medium redditCard" icon="massive reddit alien icon" backgroundColor="#ff4301"/>
            <ApiCard name="TWITCH" class="card medium twitchCard" icon="massive twitch icon" backgroundColor="#6441a5"/>
        </div>
    </div>
  );
}

export default ApiCollection;