import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose';

import { FirebaseContext, withFirebase } from '../Firebase'
import { SignUpLink } from '../SignUp'
import * as ROUTES from '../../constants/routes'
 
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INIT_SIGNIN = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
    constructor (props) {
      super(props);

      this.state = { ...INIT_SIGNIN };
    }

    onSubmit = event => {
      const { email, password } = this.state;

      this.props.firebase.doSigninWithEmailAndPassword (email,password)
        .then(authUser => {
          this.setState({...INIT_SIGNIN});
          this.props.history.push(ROUTES.HOME);
        }).catch(error => {
          this.setState({ error });
        })

      event.preventDefault();
    }

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value});
    }

    render() {
      const {
        email,
        password,
        error,
      } = this.state;

      return (
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Enter Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
          
          {error && <p>{error.message}</p>}
        </form>
      );
    }
}
 

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };