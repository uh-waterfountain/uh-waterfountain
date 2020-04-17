import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Building extends React.Component {
  render() {
    return (
        <Card centered href='#link-placeholder'>
          <Card.Content>
            <Card.Header>{this.props.building.buildingName}</Card.Header>
            <img
                src={this.props.building.image}
                height={150}
                width={262}
            />
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Building.propTypes = {
  building: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Building);
