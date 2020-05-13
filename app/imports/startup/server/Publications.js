import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Fountains } from '../../api/fountain/Fountain';
import { Ratings } from '../../api/rating/Rating';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Ratings', function publish() {
  if (this.userId) {
    return Ratings.find({});
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Fountains', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Fountains.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('FountainsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Fountains.find();
  }
  return this.ready();
});
