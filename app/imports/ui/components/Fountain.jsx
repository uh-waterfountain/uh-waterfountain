import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Fountain extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>Fountain</Card.Header>
            <img
                src={this.defaultFountain.image}
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
  building: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Fountain);
