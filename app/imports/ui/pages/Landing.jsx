import React from 'react';
import { Grid, Container, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', paddingTop: '15px' };
    return (
        <div style={menuStyle}>
        <Grid className='landing-background'>
          <Grid className='landing-text' container stackable centered columns={1}>
            <Grid.Column textAlign='left'>
              <Container text>
              <p className='landing1'>UH Water Connoisseur</p>
              <p className='landing2'>Quench your thirst, find your fountain</p>
              </Container>
            </Grid.Column>
          <Button.Group>
            <Button size='huge' primary as={NavLink} exact to="/signin" animated>
              <Button.Content visible>Sign In</Button.Content>
              <Button.Content hidden>
                <Icon name='user' />
              </Button.Content>
            </Button>
            <Button.Or />
            <Button size='huge' secondary as={NavLink} exact to="/signup" animated>
              <Button.Content visible>Sign Up</Button.Content>
              <Button.Content hidden>
                <Icon name='add user' />
              </Button.Content>
            </Button>
          </Button.Group>
          </Grid>
        </Grid>
        </div>
    );
  }
}

export default Landing;
