import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Fountain extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.fountain.fountainName}</Card.Header>
            <Header as="h3">{this.props.fountain.floor}</Header>
            <img
                src={this.props.fountain.image}
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
  fountain: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Fountain);
