import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Fountains = new Mongo.Collection('Fountains');

/** Define a schema to specify the structure of each document in the collection. */
const FountainsSchema = new SimpleSchema({
  image: String,
  name: String,
  location: String,
  building: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Fountains.attachSchema(FountainsSchema);

/** Make the collection and schema available to other code. */
export { Fountains, FountainsSchema };
