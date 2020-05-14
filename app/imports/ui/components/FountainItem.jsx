import React from 'react';
import { Card, Grid, Header, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withRouter } from 'react-router-dom';
import RateFountain from './RateFountain';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FountainItem extends React.Component {
  render() {
    const leftStyle = { marginTop: '10px', marginBottom: '10px', marginRight: '-10px', marginLeft: '5px' };
    const rightStyle = { marginTop: '10px', marginBottom: '10px' };

    return (
        <Card fluid>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column style={leftStyle}>
                <Image src={this.props.fountain.image}/>
              </Grid.Column>
              <Grid.Column style={rightStyle}>
                <Card.Content>
                <Header as="h3" textAlign="left">{this.props.fountain.name}</Header>
                <Header as="h4" textAlign="left">{this.props.fountain.location}</Header>
                  <RateFountain owner={Meteor.user()} fountainId={this.props.fountain._id} Ratings=
                      {this.props.Ratings}
                                score={_.where(_.where(this.props.rating,
                                    { fountainId: this.props.fountain._id }),
                                    { owner: Meteor.user() })}
                                ratingCheck={_.contains(_.pluck(_.where(_.where(this.props.rating,
                                    { fountainId: this.props.fountain._id }),
                                    { owner: Meteor.user() }), 'owner'), Meteor.user())}/>
                </Card.Content>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>

    );
  }

getRating(idGet) {
  if (this.props.Ratings.find({ fountainId: idGet }).count() <= 0) {
    return 0;
  }
  const infoGet = _.pluck(this.props.Ratings.find({ fountainId: idGet }).fetch(), 'score');
  const infoReduce = _.reduce(infoGet, (memo, num) => memo + num);
  const infoLength = (infoGet.length);
  return (infoReduce / infoLength);
}

getRatingCount(number) {
  return number;
}
}

/** Require a document to be passed to this component. */
FountainItem.propTypes = {
  fountain: PropTypes.object.isRequired,
  Ratings: PropTypes.object.isRequired,
  rating: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(FountainItem);
