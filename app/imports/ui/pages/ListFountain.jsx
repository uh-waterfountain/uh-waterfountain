import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Building from '/imports/ui/components/Building';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListFountain extends React.Component {
  buildings = [{
    buildingName: 'POST',
    image: 'https://www.staradvertiser.com/wp-content/uploads/2017/01/web1_CTY-UH-Explosion-Report-084.jpg',
  },
    {
      buildingName: 'Kuykendall',
      image: 'https://bloximages.newyork1.vip.townnews.com/manoanow.org/' +
          'content/tncms/assets/v3/editorial/f/7c/f7c643d8-c908-11e3-abf2-0017a43b2370/535497a530bdc.' +
          'image.jpg?resize=400%2C189',
    },
    {
      buildingName: 'ART',
    },
    {
      buildingName: 'Moore',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Buildings with Fountains</Header>
          <Card.Group>
            {this.buildings.map((building, index) => <Building key={index} building={building}/>)}
          </Card.Group>
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
