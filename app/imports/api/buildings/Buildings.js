import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const buildingName = 'Buildings';

/** Define a Mongo collection to hold the data. */
const Buildings = new Mongo.Collection(buildingName);

/**
 * Define a schema to specify the structure of each document in the collection.
 * Names must be unique.
 * */
const BuildingSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Buildings.attachSchema(BuildingSchema);

/** Make the collection and schema available to other code. */
export { Buildings, BuildingSchema, buildingName };