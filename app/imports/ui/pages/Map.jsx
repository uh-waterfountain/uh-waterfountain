import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Image, Loader, Header, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Map extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container className='map'>
          <Header as='h3' inverted className='map-text'>
            This map shows the locations of all available buildings with fountains from the List Fountains page
          </Header>
        <Image src="/images/map.png" size='massive'rounded centered/>
        <Header as='h3' inverted>
          Number of fountains in each building:
        </Header>
          <List bulleted>
          <List.Item>
            Art Building: 2</List.Item>
          <List.Item>
            Bilger Hall: 2
          </List.Item>
            <List.Item>
          Business Administration: 2
            </List.Item>
            <List.Item>
              Campus Center: 1
            </List.Item>
          <List.Item>
          Hamilton Library: 1
            </List.Item>
          <List.Item>
            Hawaii Institute of Geophysics (HIG): 2
          </List.Item>
            <List.Item>
              Keller Hall: 1
            </List.Item>
            <List.Item>
              Kuykendall Hall: 1
            </List.Item>
            <List.Item>
              Moore Hall: 1
            </List.Item>
          <List.Item>
            Pacific Ocean Science & Technology (POST): 2
          </List.Item>
            <List.Item>
              Queen Lili&apos;uokalani Center (QLC): 1
            </List.Item>
          <List.Item>
            Sinclair Library: 1
          </List.Item>
          </List>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Map.propTypes = {
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
})(Map);
