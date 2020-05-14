import React from 'react';
import { Button, Item, Rating, Divider, Card, Grid, Header, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import RateFountain from './RateFountain';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FountainItem extends React.Component {
  render() {
    return (
        <Card fluid>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Image src={this.props.fountain.image}/>
              </Grid.Column>
              <Grid.Column>
                <Card.Content>
                <Header as="h3" textAlign="left">{this.props.fountain.name}</Header>
                <Header as="h4" textAlign="left">{this.props.fountain.location}</Header>
                  <RateFountain owner={Meteor.user().username} fountainId={this.props.fountain._id} Ratings=
                      {this.props.Ratings}
                                score={_.where(_.where(this.props.rating,
                                    { fountainId: this.props.fountain._id }),
                                    { owner: Meteor.user().username })}
                                ratingCheck={_.contains(_.pluck(_.where(_.where(this.props.rating,
                                    { fountainId: this.props.fountain._id }),
                                    { owner: Meteor.user().username }), 'owner'), Meteor.user().username)}/>
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