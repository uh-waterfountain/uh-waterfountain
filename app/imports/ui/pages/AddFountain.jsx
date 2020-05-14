import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Fountains } from '../../api/fountain/Fountain';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  location: {
    type: String,
    allowedValues: ['Art', 'Bilger', 'Busad', 'Campus Center', 'Hamilton', 'HIG',
      'Keller', 'Kuykendall', 'Moore', 'POST', 'QLC', 'Sinclair'],
    defaultValue: 'Art',
  },
  image: String,
  type: {
    type: String,
    allowedValues: ['Water Bottle Refillable', 'Not Water Bottle Refillable'],
    defaultValue: 'Not Water Bottle Refillable',
  },
});

/** Renders the Page for adding a document. */
class AddFountain extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, location, image, type } = data;
    const owner = Meteor.user().username;
    const acceptance = 'pending';
    Fountains.insert({ name, location, image, type, owner, acceptance },
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
            <Header as="h2" textAlign="center" inverted>Add Fountain</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <SelectField name='location'/>
                <TextField name='image'/>
                <SelectField name='type'/>
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
