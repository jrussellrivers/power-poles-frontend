import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//components
import Nav from "./Components/Nav"
import Login from "./Components/Login";
import MyInspections from "./Components/MyInspections";
import AddInspection from "./Components/AddInspection";
import AddUser from "./Components/AddUser";
import ProtectedRoute from "./Components/ProtectedRoute"
import AllInspections from "./Components/AllInspections"
import EditInspection from './Components/EditInspection'
import AllUsers from "./Components/AllUsers"
import EditUser from "./Components/EditUser"




function App() {
  const [currentUser, setCurrentUser] = useState(undefined)

  return (
    <Router>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          {/* <h2>This is the homepage</h2> */}
        </Route>
        <Route path="/login">
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {currentUser && !currentUser.admin && <Redirect to="/myinspections" />}
          {currentUser && currentUser.admin && <Redirect to="/inspections" />}
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
            component={AllInspections}
          />
          <ProtectedRoute
            path="/addinspection"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={AddInspection}
          />
          <ProtectedRoute
            path="/editinspection"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={EditInspection}
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
            component={AllUsers}
          />
          <ProtectedRoute
            path="/edituser"
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={EditUser}
          />
      </Switch>
    </Router>
  );
}

export default App;
