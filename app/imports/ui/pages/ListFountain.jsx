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
    image: '/images/Post.jpg',
    link: '/post',
  },
    {
      buildingName: 'Kuykendall',
      image: '/images/Kuykendall.jpg',
      link: '/kuykendall',
    },
    {
      buildingName: 'ART',
      image: '/images/Art.png',
      link: '/art',
    },
    {
      buildingName: 'Moore',
      image: '/images/Moore.jpg',
      link: '/moore',
    },
    {
      buildingName: 'Sinclair Library',
      image: '/images/Sinclair.jpg',
      link: '/sinclair',
    },
    {
      buildingName: 'Queen Liliuokalani Center',
      image: '/images/Qlc.jpg',
      link: '/qlc',
    },
    {
      buildingName: 'Campus Center',
      image: '/images/Center.jpg',
      link: '/center',
    },
    {
      buildingName: 'Bilger',
      image: '/images/Bilger.jpg',
      link: '/bilger',
    },
    {
      buildingName: 'Hamilton Library',
      image: '/images/Hamilton.jpg',
      link: '/hamilton',
    },
    {
      buildingName: 'Business Administration',
      image: '/images/Busad.jpg',
      link: '/busad',
    },
    {
      buildingName: 'Hawaii Institute of Geophysics',
      image: '/images/Hig.jpg',
      link: '/hig',
    },
    {
      buildingName: 'Keller',
      image: '/images/Keller.jpeg',
      link: '/keller',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container >
          <Header as="h2" textAlign="center" inverted>List of Buildings with Fountains</Header>
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
