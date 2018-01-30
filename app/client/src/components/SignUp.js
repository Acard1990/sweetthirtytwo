import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import NavHeader from './NavHeader';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.email,
        password: this.state.password,
        role: 'owner',
      },
    }).then((user) => {
      const { jwt } = user.data.signup;
      this.saveUserData(jwt);
      this.props.history.push('/add_business');
    }).catch((error) => {
      console.log('Sign up did not succeed because:', error);
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  saveUserData(token) {
    localStorage.setItem('token', token);
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container">
          <form className="mx-auto login-form">
            <div className="form-group">
              <label htmlFor="username">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                required="required"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                required="required"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email Address"
                required="required"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="login-button" onClick={this.onClick}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const AddNewUser = gql`
    mutation signup($firstName: String, $lastName: String, $username: String, $password: String, $email: String, $role: String) {
      signup(firstName: $firstName, lastName: $lastName, username: $username, password: $password, email: $email, role: $role) {
        _id
        firstName
        lastName
        username
        jwt
      }
    }
  `;

SignUp.propTypes = {
  mutate: PropTypes.func,
};


export default graphql(AddNewUser)(SignUp);
