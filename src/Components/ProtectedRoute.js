import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, currentUser, setCurrentUser, ...rest }) => {
  console.log(currentUser)
  return (
    <Route {...rest} render={
      props => {
        if (currentUser) {
          return <Component {...rest} {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;