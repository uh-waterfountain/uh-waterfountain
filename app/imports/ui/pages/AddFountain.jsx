import React from 'react';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Fountains } from '../../api/fountain/Fountains';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Buildings, buildingName } from '../../api/buildings/Buildings';
import { Floors, floorName } from '../../api/floor/Floor';
import { withTracker } from 'meteor/react-meteor-data';

const buildingOptions = [
    { key: 'ar', value: 'ar', text: 'Art Building' },
    { key: 'bi', value: 'bi', text: 'Bilger Hall' },
    { key: 'bu', value: 'bu', text: 'Business Admin' },
    { key: 'ca', value: 'ca', text: 'Campus Center' },
    { key: 'ha', value: 'ha', text: 'Hamilton Library' },
    { key: 'hi', value: 'hi', text: 'Higham Hall' },
    { key: 'ke', value: 'ke', text: 'Keller Hall' },
    { key: 'ku', value: 'ku', text: 'Kuykendall' },
    { key: 'mo', value: 'mo', text: 'Moore' },
    { key: 'po', value: 'po', text: 'POST' },
    { key: 'qu', value: 'qu', text: 'Queen Liliuokalani Center' },
    { key: 'si', value: 'si', text: 'Sinclair Library' },
];

const floorNums = [
  { key: '1', value: '1', text: 'Floor 1' },
  { key: '2', value: '2', text: 'Floor 2' },
  { key: '3', value: '3', text: 'Floor 3' },
  { key: '4', value: '4', text: 'Floor 4' },
  { key: '5', value: '5', text: 'Floor 5' },
];

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allBuildings, allFloors) => new SimpleSchema({
  name: String,
  image: String,
  building: { type: Array, label: 'Buildings', optional: true },
  'building.$': { type: String, allowedValues: allBuildings },
  floor: { type: Array, label: 'Floors', optional: true },
  'floor.$': { type: String, allowedValues: allFloors },
  owner: String,
});

/** Renders the Page for adding a document. */
class AddFountain extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, building, floor, image } = data;
    const owner = Meteor.user().username;
    Fountains.insert({ name, building, floor, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const allBuildings = _.pluck(Buildings.find().fetch(), 'name');
    const allFloors = _.pluck(Floors.find().fetch(), 'email');
    const formSchema = makeSchema(allBuildings, allFloors);
    const dropdownStyle = { marginTop: '10px', marginBottom: '10px' }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Fountain</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <Dropdown name='building' style={dropdownStyle}
                    placeholder='Select The Building the Fountain is Located'
                    selection
                    fluid
                    options={buildingOptions}
                />
                <TextField name='image'/>
                <Dropdown name='floor' style={dropdownStyle}
                    placeholder='Select The Floor the Fountain is Located'
                    selection
                    fluid
                    options={floorNums}
                />
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddFountain.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe('Buildings');
  const sub2 = Meteor.subscribe('Floors');
  const sub3 = Meteor.subscribe('floorName');
  const sub4 = Meteor.subscribe('buildingName');
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(AddFountain);

