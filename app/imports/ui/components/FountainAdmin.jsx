import React from 'react';
import { Card, CardContent } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FountainAdmin extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.fountain.name}</Card.Header>
            <CardContent>{this.props.fountain.location}</CardContent>
            <img
                src={this.props.fountain.image}
                height={150}
                width={262}
            />
            <Card.Content extra>
              <Link to={`/edit/${this.props.fountain._id}`}>Edit</Link>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
FountainAdmin.propTypes = {
  fountain: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(FountainAdmin);
