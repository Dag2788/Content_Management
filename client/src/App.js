import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Trendy from "./Trendy";
import LandingPage from "./LandingPage";


const App = () => {

    return (
        <Switch>
            <Route path="/" component={Trendy} exact />
            <Route path="/content/:id" component={LandingPage} />
            <Route component={Error} />
        </Switch>
    );
};

export default App;