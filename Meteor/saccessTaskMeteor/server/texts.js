import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

export const Texts = new Mongo.Collection('texts');

Meteor.methods({
  'insert_update_text': (data) => {

    var text = Texts.findOne({
      owner: data['owner']
    }, {
      fields: {
        'text': 1,
      }
    });

    if(text) {
      Texts.update({owner: data['owner']}, {$set: {text: data['text']}});
    } else {
      Texts.insert({
        text: data['text'],
        owner: data['owner']
      });
    }
  },
});

Meteor.publish('texts', function() {
  return Texts.find();
});