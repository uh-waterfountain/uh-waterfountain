import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Fountains } from '../../api/fountain/Fountain';
import Fountain from '../components/Fountain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Qlc extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container >
          <Header as="h2" textAlign="center" inverted>Qlc</Header>
          <Card.Group>
            {this.props.fountains.map((fountain, index) => <Fountain key={index} fountain={fountain}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Qlc.propTypes = {
  fountains: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Fountains');
  return {
    fountains: Fountains.find({ location: 'QLC', acceptance: 'accepted' }).fetch(),
    ready: subscription.ready(),
  };
})(Qlc);
