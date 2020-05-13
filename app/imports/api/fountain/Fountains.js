import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Fountains = new Mongo.Collection('Fountains');

/** Define a schema to specify the structure of each document in the collection. */
const FountainSchema = new SimpleSchema({
  name: String,
  building: String,
  floor: Number,
  image: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Fountains.attachSchema(FountainSchema);

/** Make the collection and schema available to other code. */
export { Fountains, FountainSchema };