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
      image: 'https://manoa.hawaii.edu/landscaping/images/elements/baobab480.png',
    },
    {
      buildingName: 'Moore',
      image: 'https://bloximages.newyork1.vip.townnews.com/manoanow.org/' +
          'content/tncms/assets/v3/editorial/8/b6/' +
          '8b6303d2-87ff-11e9-a142-1f214e0527fa/5cf874e3a3f3a.image.jpg?resize=1200%2C800',
    },
    {
      buildingName: 'Sinclair Libary',
      image: 'https://manoa.hawaii.edu/undergrad/ssc/wp-content/uploads/2014/04/sinclair002.jpg',
    },
    {
      buildingName: 'Queen Liliuokalani Center',
      image: 'https://pbs.twimg.com/media/ETQgu6vXQAEd3BG.jpg',
    },
    {
      buildingName: 'Campus Center',
      image: 'https://i1.wp.com/www.hawaii.edu/news/wp-content/' +
          'uploads/2019/09/manoa-campus-center.jpg?fit=676%2C381&ssl=1',
    },
    {
      buildingName: 'Bilger Hall',
      image: 'https://manoa.hawaii.edu/chem/wp-content/uploads/slide-building-1400x420.jpg',
    },
    {
      buildingName: 'Hamilton Libary',
      image: 'https://manoa.hawaii.edu/undergrad/ssc/wp-content/' +
          'uploads/2014/04/university-of-hawaii-manoa-7037e8e9.jpg',
    },
    {
      buildingName: 'Business Administration',
      image: 'https://manoa.hawaii.edu/news/attachments/img7693_5819l.jpg',
    },
    {
      buildingName: 'Hawaii Institute of Geophysics',
      image: 'https://www.soest.hawaii.edu/atmo/wp-content/uploads/2019/10/HIG1a-750x350.jpg',
    },
    {
      buildingName: 'Keller Hall',
      image: 'https://modtraveler.net/wp-content/uploads/2015/08/University-of-Hawaii-8.jpeg',
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
          <Header as="h2" textAlign="center">List of Buildings with Fountains</Header>
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
