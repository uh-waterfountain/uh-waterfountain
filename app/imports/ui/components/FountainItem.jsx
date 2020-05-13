import React from 'react';
import { Button, Item, Rating, Divider, Card, Grid, Header, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import RateFountain from './RateFountain';
import { Fountains } from '../../api/fountain/Fountain';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FountainItem extends React.Component {
  render() {
    return (
        <Card fluid>
          <Grid columns={2} divided style={cardStyle}>
            <Grid.Row>
              <Grid.Column>
                <Image src={this.props.fountain.image}/>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3" textAlign="left">{this.props.fountain.name}</Header>
                <Header as="h4" textAlign="left">{this.props.fountain.location}</Header>
                <Item.Extra>
                  <div className='spots-text'> Average Rating:
                    &nbsp; <Rating icon='star' maxRating={5} rating={this.getRating(this.props.fountain._id)}
                                   disabled/> &nbsp;
                    (Total Ratings:
                    {this.getRatingCount(this.props.Ratings.find({ spotId: this.props.fountain._id }).count())})
                  </div>
                </Item.Extra>
                <Item.Extra>
                  <RateFountain user={Meteor.user().username} spotId={this.props.fountain._id} Ratings=
                      {this.props.Ratings}
                                score={_.where(_.where(this.props.rating,
                                    { spotId: this.props.fountain._id }),
                                    { owner: Meteor.user().username })}
                                ratingCheck={_.contains(_.pluck(_.where(_.where(this.props.rating,
                                    { spotId: this.props.fountain._id }),
                                    { owner: Meteor.user().username }), 'owner'), Meteor.user().username)} />
                </Item.Extra>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
FountainItem.propTypes = {
  Fountains: PropTypes.object.isRequired,
  fountain: PropTypes.object.isRequired,
  Ratings: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(FountainItem);