import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class FountainItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.location}</Table.Cell>
          <Table.Cell>{this.props.stuff.quality}</Table.Cell>
          <Table.Cell>{this.props.stuff.rating}</Table.Cell>
          <Table.Cell>{this.props.stuff.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
FountainItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default FountainItemAdmin;
