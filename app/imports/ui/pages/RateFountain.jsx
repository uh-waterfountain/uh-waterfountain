import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import Contact from '/imports/ui/components/Contact';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rating } from '../../api/rating/Rating';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RateFountain extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Rating</Header>
          <Card.Group>
            {this.props.rating.map((rating, index) => <Contact key={index} rating={rating} notes=
                {this.props.notes.filter(note => (note.contactId === rating._id))}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RateFountain.propTypes = {
  rating: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Rating');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    rating: Rating.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(RateFountain);

