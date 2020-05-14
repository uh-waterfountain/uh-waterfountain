import React from 'react';
import { Item, Rating, Container } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';

/** Renders the Page for adding a document. */
class RateFountain extends React.Component {
  render() {
    let defaultScore = 0;
    const pluckScore = _.pluck(this.props.score, 'score');
    if (pluckScore.length === 1) {
      defaultScore = _.reduce(pluckScore, (memo, num) => num);
    }
    if (this.props.ratingCheck === true) {
      return (
          <Container>
            <Item.Extra>
              <div className='spots-text'>
                User has Rated: &nbsp; <Rating className='ratingInterface' icon='star'
                                               defaultRating={defaultScore} maxRating={5} onRate={this.submitRating}/>
                &nbsp; (Click again to re-rate!)
              </div>
            </Item.Extra>
          </Container>
      );
    }
    return (
        <Container>
          <Item.Extra>
            <div className='fountain-text'>
              Have you tried this water fountain? <br/>
              Leave a rating here! <br/>
              <Rating className='ratingInterface' icon='star' defaultRating={0} maxRating={5}
                      onRate={this.submitRating}/> &nbsp; (Click to rate!)
            </div>
          </Item.Extra>
        </Container>
    );
  }

  submitRating = (event, data) => {
    if (this.props.ratingCheck === true) {
      const pluckId = _.reduce(_.pluck(this.props.score, '_id'), (memo, num) => num);
      this.props.Ratings.update({ _id: pluckId }, { $set: { score: data.rating } },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            }
          });
    } else {
      this.props.Ratings.insert({ score: data.rating, owner: this.props.user, fountainId: this.props.fountainId },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            }
          });
    }
  }
}

RateFountain.propTypes = {
  user: PropTypes.string.isRequired,
  fountainId: PropTypes.string.isRequired,
  ratingCheck: PropTypes.bool.isRequired,
  score: PropTypes.array.isRequired,
  Ratings: PropTypes.object.isRequired,
};

export default RateFountain;
