import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  location: Number,
  type: {
    type: String,
    allowedValues: ['Water bottle refillable', 'Not water bottle refillable'],
    defaultValue: 'Not water bottle refillable',
  },
  quality: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
  rating: {
    type: Number,
    allowedValues: ['1', '2', '3', '4', '5'],
    defaultValue: '3',
  },
});

/** Renders the Page for adding a document. */
class AddFountain extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, location, quality, rating} = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ name, location, quality, rating, owner },
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
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Fountain</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <NumField name='location'/>
                <SelectField name='type'/>
                <SelectField name='quality'/>
                <SelectField name='rating'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddFountain;
