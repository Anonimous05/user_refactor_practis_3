import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Header from "./Component/Header/Header";
import './App.css';
import Main from './Container/Main/Main';
import AddUser from "./Container/AddUser/AddUser";
import InfoUser from "./Container/InfoUser/InfoUser";

function App() {
  return (
    <div className="App">
        <Header/>
        <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/add" component={AddUser}/>
        <Route path="/info/:id" component={InfoUser}/>
      </Switch>
    </div>
  );
}

export default App;
