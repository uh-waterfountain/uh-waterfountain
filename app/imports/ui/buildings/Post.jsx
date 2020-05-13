import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, Rating, Card, TextArea, Button, Form, Comment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Ratings } from '../../api/rating/Ratings';
import RatingFountain from '../components/RatingFountain';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { withRouter } from 'react-router-dom';
import { Fountains } from '../../api/fountain/Fountains';
import RateFountain from '../components/RateFountain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Post extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      score: Number,
      owner: String,
      spotId: String,
      activePage: 1,
    };
    this.renderPage = this.renderPage.bind(this);
  }

  handleRating = (e, data) => {
    this.setState({ userRating: data.rating });
  };

  handlePageChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  submit = () => {
    if (this.state.userRating === 0) {
      this.setState({ error: 'You forgot to rate!' });
    } else {
      Ratings.insert({ Ratings:this.props.Ratings , owner:Meteor.user().username , spotId:this.props.fountain._id }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          // eslint-disable-next-line no-undef
          swal('Success', 'Rating successfully', 'success').then(() => window.location.reload());
        }
      });
    }
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    const menuStyle = { marginBottom: '10px', paddingTop: '15px' };
    const cardStyle = { marginBottom: '10px', marginLeft: '10px', marginRight: '10px', paddingTop: '15px' };
    const submitStyle = { marginTop: '10px' };
    return (
        <div style={menuStyle}>
          <Container>
            <Header as="h2" textAlign="center" inverted>Pacific Oceans Sciences and Technology</Header>
            <Card.Group>
              <Card fluid>
                <Grid columns={2} divided style={cardStyle}>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src='/fountains/post01.jpg' />
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h3" textAlign="left">Fountain 01</Header>
                      <Header as="h4" textAlign="left">Located: Floor 1</Header>
                      <RateFountain user={Meteor.user().username} spotId={this.props.fountain._id}
                                    Ratings= {this.props.Ratings}
                                    score={_.where(_.where(this.props.rating,
                                        { spotId: this.props.fountain._id }),
                                        { owner: Meteor.user().username })}
                                    ratingCheck={_.contains(_.pluck(_.where(_.where(this.props.rating,
                                        { spotId: this.props.fountain._id }),
                                        { owner: Meteor.user().username }), 'owner'), Meteor.user().username)} />
                      <Form onSubmit={this.submit}>
                        <Form.TextArea required
                                       label='Comment'
                                       name='comment'
                                       type='content'
                                       placeholder='Describe your experience...'
                                       onChange={this.handleReview}
                      />
                      <Form.Field
                          control={Button}
                          content='Submit'/>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card>
              <Card fluid>
                <Grid columns={2} divided style={cardStyle}>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src='/fountains/post02.jpg' />
                    </Grid.Column>
                    <Form>
                    <Grid.Column>
                      <Header as="h3" textAlign="left">Fountain 02</Header>
                      <Header as="h4" textAlign="left">Located: Floor 1</Header>
                      <Rating maxRating={5} clearable />
                      <TextArea placeholder = 'Tell Us About Your Experience!'/>
                    </Grid.Column>
                    </Form>
                  </Grid.Row>
                </Grid>
              </Card>
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Post.propTypes = {
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.bool.isRequired,
  Fountains: PropTypes.object.isRequired,
  fountain: PropTypes.object.isRequired,
  Ratings: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Fountains');
  const subscription2 = Meteor.subscribe('Ratings');
  return {
    fountain: Fountains.find({}).fetch(),
    ratings: Ratings.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Post);