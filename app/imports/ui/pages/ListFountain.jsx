import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/FountainItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListFountain extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Fountains</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Water Quality</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.stuffs.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListFountain.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListFountain);
