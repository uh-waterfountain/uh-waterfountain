import React from 'react';
import { Container, Header, Grid, Card, Image, Rating, Form, Button, Label, Feed} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';
import AddNote from '../components/AddNote'

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Rating extends React.Component {

  render() {
    const menuStyle = { marginBottom: '10px', paddingTop: '15px' };
    const cardStyle = { marginBottom: '10px', marginLeft: '10px', marginRight: '10px', paddingTop: '15px' };
    return (
        <div style={menuStyle}>
          <Container>
            <Card.Group>
              <Card fluid>
                <Grid columns={2} divided style={cardStyle}>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src='/images/placeholder.jpg' />
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h3" textAlign="left">POST Fountain 1</Header>
                      <Rating maxRating={5} clearable />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Card.Content extra>
                  <Feed>
                    {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                  </Feed>
                </Card.Content>
                <Card.Content extra>
                  <AddNote owner={this.props.rating.owner} contactId={this.props.rating._id}/>
                </Card.Content>
              </Card>
            </Card.Group>
          </Container>
        </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
}


/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(Rating);