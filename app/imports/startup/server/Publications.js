import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Ratings } from '../../api/ratings/Ratings';
import { Buildings, buildingName } from '../../api/buildings/Buildings';
import { Floors, floorName } from '../../api/floor/Floor';
import { Fountains } from '../../api/fountain/Fountains'

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
Meteor.publish('Floors', function publish() {
  if (this.userId) {
    return Floors.find({});
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Buildings', function publish() {
  if (this.userId) {
    return Buildings.find({});
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Fountains', function publish() {
  if (this.userId) {
    return Fountains.find({});
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Buildings', function publish() {
  if (this.userId) {
    return Buildings.find({ buildingName });
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Floors', function publish() {
  if (this.userId) {
    return Floors.find({ floorName });
  }
  return this.ready();
});