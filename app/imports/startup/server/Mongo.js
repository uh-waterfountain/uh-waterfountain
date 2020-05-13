import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Fountains } from '../../api/fountain/Fountain';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addFountain(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Fountains.insert(data);
}

/** Initialize the collection if empty. */
if (Fountains.find().count() === 0) {
  if (Meteor.settings.defaultFountains) {
    console.log('Creating fountain data.');
    Meteor.settings.defaultFountain.map(data => addFountain(data));
  }
}
