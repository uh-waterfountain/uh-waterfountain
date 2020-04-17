import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Header, Message } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  };

  /** Render the signin form. */
  render() {
    const menuStyle = { marginLeft: '10px' };
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <div style={menuStyle} className="ui grid">
          <div className="four wide top attached centered middle aligned horizontally padded column">
            <Header as="h2" textAlign="centered" inverted>
              Login to your account
            </Header>
            <Form onSubmit={this.submit} inverted>
                <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                />
                <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
            </Form>
            <Message>
              <Link to="/signup">Dont Have One? Click Here!</Link>
            </Message>
            {this.state.error === '' ? (
                ''
            ) : (
                <Message
                    error
                    header="Login was not successful"
                    content={this.state.error}
                />
            )}
          </div>
          <div className="twelve wide attached column">
            <img src="/images/landing-background2.jpg" className="ui image"/>
          </div>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
