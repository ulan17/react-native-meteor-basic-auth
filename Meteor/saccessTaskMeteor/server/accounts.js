import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check';

Meteor.methods({
    'create_user': (data) => {
      check(data['email', String]);
      check(data['password'], String);
      const userId = Accounts.createUser({email: data['email'], password: data['password']});
      return userId;
    },
  });

Meteor.publish('current_user',()=>{  
   return Meteor.users.find({_id:this.userId}, {limit:1, fields: {profile:1}});
});

