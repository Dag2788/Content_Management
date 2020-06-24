import React from 'react';
import './App.css';
import ToDoList from "./To-Do-List";

const App = () => {

    return (
        <div className="App">
            <div className="App-content">
              <ToDoList />
            </div>
        </div>
    );
};

export default App;