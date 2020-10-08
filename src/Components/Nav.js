import React from "react";
import logo from "../images/logo.png";

import {
    Link,
  } from "react-router-dom";

export default function Nav({currentUser, setCurrentUser}) {

    const logOut = () => {
        setCurrentUser(undefined);

        fetch("/logout", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
            console.log("User is logged off!")
          });
  }
      
  return <div>
      <nav className="navbar is-dark">
        <div className="navbar-start">
          <img src={logo} alt="mclean logo" className="logo" />
        </div>

        <div className="navbar-end">
              <Link className="navbar-item" to="/login">
                Login
              </Link>
              {currentUser && !currentUser.admin && 
              <Link className="navbar-item" to="/myinspections">
                My Inspections
              </Link>}
              {currentUser && currentUser.admin &&
              <React.Fragment>
              <Link className="navbar-item" to="/inspections">
                Inspections
              </Link>
              <Link className="navbar-item" to="/users">
                Users 
              </Link>
              </React.Fragment>}
              {currentUser && 
              <Link className="button" onClick={logOut}>
                Log Out
              </Link>}
        </div>
      </nav>
  </div>;
}
