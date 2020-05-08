import React from 'react';
import { Comment, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Displays the user's average rating and comments */
class RatingFountain extends React.Component {
  render() {
    return (
        <Comment>
          <Comment.Content>
            <Rating icon='star' defaultRating={this.props.rating.rating} maxRating={5} disabled/>
            <Comment.Author>
              {this.props.rating.raterEmail}
            </Comment.Author>
            <Comment.Metadata>
              <div>{this.props.rating.createdAt.toLocaleDateString('en-US')}</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.rating.comment}
            </Comment.Text>
          </Comment.Content>
        </Comment>
    );
  }
}

RatingFountain.propTypes = {
  rating: PropTypes.object.isRequired,
};

export default withRouter(RatingFountain);