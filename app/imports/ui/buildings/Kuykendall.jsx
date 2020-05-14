import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FountainItem from '/imports/ui/components/FountainItem';
import { Ratings } from '../../api/rating/Rating';
import { Fountains } from '../../api/fountain/Fountain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Kuykendall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handleChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Kuykendall Hall</Header>
          <Card.Content>
            {this.props.fountains.map((fountain, index) => <FountainItem key={index} Fountains={Fountains}
                                                                         fountain={fountain}
                                                                         Ratings={Ratings}
                                                                         rating={this.props.ratings}/>)}
          </Card.Content>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Kuykendall.propTypes = {
  fountains: PropTypes.array.isRequired,
  ratings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Fountains');
  const subscription2 = Meteor.subscribe('Ratings');
  return {
    fountains: Fountains.find({ location: 'Kuykendall' }).fetch(),
    ratings: Ratings.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Kuykendall);
