import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ToDoList from "./To-Do-List";
import LandingPage from "./LandingPage"

const App = () => {

    return (
        <Switch>
            <Route path="/" component={ToDoList} exact />
            <Route path="/content" component={LandingPage} />
            <Route component={Error} />
        </Switch>
    );
};

export default App;