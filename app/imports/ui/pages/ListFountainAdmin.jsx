import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Grid, Image, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListFountainAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
          <Container>
            <Header as="h2" textAlign="center" inverted>Current Listed Fountains (Admin view only)</Header>
            <Grid columns={4}>
              <Grid.Row>
                <Grid.Column>
            <Card>
            <Image size='mini' src='/fountains/art01.jpg' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>Art Building</Card.Header>
              <Card.Description>
                Located: Floor 1
              </Card.Description>
            </Card.Content>
            </Card>
                </Grid.Column>
                <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/art02.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Art Building</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
                </Grid.Column>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/bilger01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Bilger Hall</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/bilger02.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Bilger Hall</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
                </Grid.Row>

              <Grid.Row>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/busad01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Business Administration</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/busad02.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Business Administration</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/hamilton01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Hamilton Library</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
              <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/hig01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Hamilton Library</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
              </Grid.Column>
              </Grid.Row>

              <Grid.Row>
            <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/hig02.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>HIG</Card.Header>
                <Card.Description>
                  Located: Floor 2
                </Card.Description>
              </Card.Content>
            </Card>
            </Grid.Column>
                <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/post01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>POST</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
                </Grid.Column>
                <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/post02.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>POST</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
                </Grid.Column>
                <Grid.Column>
            <Card>
              <Image size='mini' src='/fountains/sinclair01.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Sinclair Library</Card.Header>
                <Card.Description>
                  Located: Floor 1
                </Card.Description>
              </Card.Content>
            </Card>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
              <Grid.Column>
                <Card>
                  <Image size='small' src='/fountains/placeholder.jpg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Campus Center</Card.Header>
                    <Card.Description>
                      Located: Floor 1
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
                <Grid.Column>
                <Card>
                  <Image size='mini' src='/fountains/placeholder.jpg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Keller Hall</Card.Header>
                    <Card.Description>
                      Located: Floor 2
                    </Card.Description>
                  </Card.Content>
                </Card>
                </Grid.Column>
                <Grid.Column>
              <Card>
                <Image size='mini' src='/fountains/placeholder.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Kuykendall Hall</Card.Header>
                  <Card.Description>
                    Located: Floor 1
                  </Card.Description>
                </Card.Content>
              </Card>
                </Grid.Column>
                <Grid.Column>
              <Card>
                <Image size='mini' src='/fountains/placeholder.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Moore Hall</Card.Header>
                  <Card.Description>
                    Located: Floor 1
                  </Card.Description>
                </Card.Content>
              </Card>
                </Grid.Column>
              </Grid.Row>

                <Grid.Row>
                <Grid.Column>
              <Card>
                <Image size='mini' src='/fountains/placeholder.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Queen Liliʻuokalani Center</Card.Header>
                  <Card.Description>
                    Located: Floor 1
                  </Card.Description>
                </Card.Content>
              </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListFountainAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StuffAdmin');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListFountainAdmin);
