import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, Rating, Card, Item, Pagination, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FountainItem from '/imports/ui/components/FountainItem'
import { Ratings } from '../../api/rating/Ratings';
import { Fountains } from '../../api/fountain/Fountains';

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
          <Item.Group divided>
            {this.props.fountains.slice((this.state.activePage - 1) * 5,
                this.state.activePage * 5).map((fountain, index) => <FountainItem key={index} Fountains={Fountains}
                                                                          fountain={fountain}
                                                                      Ratings={Ratings} rating={this.props.ratings}/>)}
          </Item.Group>
          <hr/>
          <Container textAlign={'center'}>
            <Pagination
                defaultActivePage={1}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal'/>, icon: true }}
                firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                totalPages={Math.ceil(this.props.fountains.length / 5)}
                onPageChange={this.handleChange}
            />
          </Container>
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
    fountain: Fountains.find({}).fetch(),
    ratings: Ratings.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Kuykendall);
