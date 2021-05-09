import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
 
const HomeBase = ( { authUser} ) => {
  console.log(authUser);
  return (
    <div>
      <h1> hi </h1>
    </div>
  )
}

const HomePage =  () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser => 
        authUser ? <HomeBase authUser={authUser} /> : <HomeBase authUser={null} />}
    </AuthUserContext.Consumer>
  </div>
)
 
export default HomePage;