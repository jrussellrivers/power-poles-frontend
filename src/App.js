import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

//components
import Nav from "./Components/Nav"
import Login from "./Components/Login";
import SearchInspection from "./Components/SearchInspection";
import SearchUsers from "./Components/SearchUsers";
import MyInspections from "./Components/MyInspections";
import AddInspection from "./Components/AddInspection";
import AddUser from "./Components/AddUser";
import ProtectedRoute from "./Components/ProtectedRoute"




function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  return (
    <Router>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          <h2>This is the homepage</h2>
        </Route>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <ProtectedRoute
            path="/myinspections"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={MyInspections}
          />
          <ProtectedRoute
            path="/inspections"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={SearchInspection}
          />
          <ProtectedRoute
            path="/addinspection"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={AddInspection}
          />
          <ProtectedRoute
            path="/adduser"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={AddUser}
          />
          <ProtectedRoute
            path="/users"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={SearchUsers}
          />
      </Switch>
    </Router>
  );
}

export default App;
