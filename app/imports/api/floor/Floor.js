import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const floorName = 'Buildings';

/** Define a Mongo collection to hold the data. */
const Floors = new Mongo.Collection(floorName);

/**
 * Define a schema to specify the structure of each document in the collection.
 * Names must be unique.
 * */
const FloorSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Floors.attachSchema(FloorSchema);

/** Make the collection and schema available to other code. */
export { Floors, FloorSchema, floorName };