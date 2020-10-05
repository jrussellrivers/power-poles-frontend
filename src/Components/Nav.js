import React from "react";
import logo from "../images/logo.png";

import {
    Link,
  } from "react-router-dom";

export default function Nav({currentUser, setCurrentUser}) {

    const logOut = () => {
        setCurrentUser(undefined);
      };
      
  return <div>
      <nav className="navbar is-dark">
        <div className="navbar-start">
          <img src={logo} alt="mclean logo" className="logo" />
        </div>

        <div className="navbar-end">
              <Link className="navbar-item" to="/login">
                Login
              </Link>
              <Link className="navbar-item" to="/myinspections">
                My Inspections (U)
              </Link>
              {/* <Link className="navbar-item" to="/search">
                Search (U)
              </Link> */}
              <Link className="navbar-item" to="/inspections">
                Inspections (A)
              </Link>
              <Link className="navbar-item" to="/users">
                Users (A)
              </Link>
              <Link className="button" onClick={logOut}>
                Log Out
              </Link>
        </div>
      </nav>
  </div>;
}
