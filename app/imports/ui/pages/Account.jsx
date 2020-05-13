import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Dropdown, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Ratings } from '../../api/rating/Ratings';
import { Stuffs } from '../../api/stuff/Stuff';
import swal from 'sweetalert';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Account extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Account submission. Take in oldPassword and replace with newPassword. */
  submit = () => {
    const { oldPassword, newPassword } = this.state;
    Accounts.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const ratings = Ratings.find({}, { sort: { createdAt: -1 } }).fetch()
        .filter(rate => rate.target === this.props.currentUser);
    const menuStyle = { marginBottom: '10px', paddingTop: '15px' };
    const { from } = this.props.location.state || { from: { pathname: '/account' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;

    }
    return (
        <div style={menuStyle} className='signup-background'>
          <Container>
            <Grid.Column textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column className='signup-column'>
                <Header as="h2" textAlign="center" className='signup'>
                  Welcome, {this.props.currentUser}!
                </Header>
                <Header as="h2" textAlign="center" className='signup'>
                  Change password
                </Header>
            </Grid.Column>
            <Grid.Column>
          <Form onSubmit={this.submit}>
            <Segment stacked>
              <Form.Input
                  label="Old Password"
                  icon="lock"
                  iconPosition="left"
                  name="oldPassword"
                  placeholder="Old Password"
                  type="password"
                  onChange={this.handleChange}
              />
              <Form.Input
                  label="New Password"
                  icon="lock"
                  iconPosition="left"
                  name="newPassword"
                  placeholder="New Password"
                  type="password"
                  onChange={this.handleChange}
              />
              <Form.Button content="Submit"/>
            </Segment>
          </Form>
          {this.state.error === '' ? (
              ''
          ) : (
              <Message
                  error
                  header="Password change was not successful"
                  content={this.state.error}
              />
              )}
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>{ratings.length} User Ratings</h3>
              {ratings.length > 0 ? <Comment.Group size={'big'}>{ratings
                      .map((rating, index) => <RatingItem rating={rating}
                                                          key={index}/>)}
                  </Comment.Group>
                  : <Header as={Container}
                            textAlign={'center'}>There is no rating for you</Header>}
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
            </Grid.Column>
            </Grid.Column>
          </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Account.propTypes = {
  location: PropTypes.object,
  currentUser: PropTypes.string,
  ratings: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const AccountContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Account);

export default withRouter(AccountContainer);
