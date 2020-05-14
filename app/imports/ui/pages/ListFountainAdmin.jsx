import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Fountains } from '../../api/fountain/Fountain';
import FountainAdmin from '../components/FountainAdmin';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListFountainAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List of Buildings with Fountains</Header>
          <Card.Group>
            {this.props.fountains.map((fountain, index) => <FountainAdmin key={index} fountain={fountain}/>)}
        </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListFountainAdmin.propTypes = {
  fountains: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Fountains');
  return {
    fountains: Fountains.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListFountainAdmin);
