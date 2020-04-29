import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, Rating, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Kuykendall extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const menuStyle = { marginBottom: '10px', paddingTop: '15px' };
    const cardStyle = { marginBottom: '10px', marginLeft: '10px', marginRight: '10px', paddingTop: '15px' };
    return (
        <div style={menuStyle}>
          <Container>
            <Header as="h2" textAlign="center" inverted>Kuykendall Hall</Header>
            <Card.Group>
              <Card fluid>
                <Grid columns={2} divided style={cardStyle}>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src='/fountains/placeholder.jpg' />
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h3" textAlign="left">Fountain 01</Header>
                      <Header as="h4" textAlign="left">Located: Floor 1</Header>
                      <Rating maxRating={5} clearable />
                    </Grid.Column>
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
Kuykendall.propTypes = {
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
})(Kuykendall);
