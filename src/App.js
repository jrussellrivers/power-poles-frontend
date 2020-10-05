import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components
import Nav from "./Components/Nav"
import Login from "./Components/Login";
import Search from "./Components/Search";
import SearchInspection from "./Components/SearchInspection";
import SearchUsers from "./Components/SearchUsers";
import MyInspections from "./Components/MyInspections";
import AddInspection from "./Components/AddInspection";
import AddUser from "./Components/AddUser";




function App() {
  const [currentUser, setCurrentUser] = useState([])
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <h2>This is the homepage</h2>
        </Route>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/myinspections">
          <MyInspections currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <Search currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/inspections">
          <SearchInspection currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/addinspection">
          <AddInspection currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/adduser">
          <AddUser currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/users">
          <SearchUsers currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
