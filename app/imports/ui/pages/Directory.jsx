import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Button, Icon, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

class Directory extends React.Component {

  render() {
    const gridStyle = { height: '100vh' };
    const align = {
      textAlign: 'center',
      color: 'white',
      filter: 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.2))',
      paddingLeft: '25px',
      paddingRight: '25px',
    };
    return (
        <div className='directory'>
          <Grid style={gridStyle} verticalAlign='middle' textAlign='center' container columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Grid.Row textAlign='center'>
                  <div style={align}>
                    <Header as="h1" textAlign="center" inverted>Welcome to UH Water Connoisseur</Header>
                    <Header inverted as="h3">List of Buildings</Header>
                    <p>Click here for the list of buildings with water fountains.</p>
                    <Button primary as={NavLink} exact to="/list" animated>
                      <Button.Content visible>Buildings List</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right'/>
                      </Button.Content>
                    </Button>
                    <Header inverted as="h3">Add a Fountain</Header>
                    <p>Is there a fountain you know that is not listed? Click here to add it.</p>
                    <Button primary as={NavLink} exact to="/add" animated>
                      <Button.Content visible>Add Fountain</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right'/>
                      </Button.Content>
                    </Button>
                  </div>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Grid.Row>
                  <Image src='/images/directory-image.jpg' className="ui image" circular />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

Directory.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuffs');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Directory);
