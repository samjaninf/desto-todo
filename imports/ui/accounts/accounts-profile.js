import {Meteor} from 'meteor/meteor'
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform'

import './accounts-profile.html'

Template.Account_profile.onCreated ( {} )

Template.Account_profile.onRendered ( {} )

Template.Account_profile.helpers ( {} )

Template.Account_profile.events ( {
  'submit' ( event, t ){
    e.preventDefault ()

  }
} )

