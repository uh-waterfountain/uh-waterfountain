import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Rating = new Mongo.Collection('Contacts');

/** Define a schema to specify the structure of each document in the collection. */
const RatingSchema = new SimpleSchema({
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Rating.attachSchema(RatingSchema);

/** Make the collection and schema available to other code. */
export { Rating, RatingSchema };
