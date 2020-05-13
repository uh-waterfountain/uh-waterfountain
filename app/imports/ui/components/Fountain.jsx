import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Fountain extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.fountains.fountainName}</Card.Header>
            <Header as="h3">{this.props.fountains.floor}</Header>
            <img
                src={this.props.fountains.image}
                height={150}
                width={262}
            />
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Fountain.propTypes = {
  fountains: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Fountain);
