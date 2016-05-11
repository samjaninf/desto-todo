import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/root-redirector.js';
import '../../ui/pages/lists-show-page.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/accounts/accounts-profile.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route ( '/profile', {
  name : 'App.profile',
  action() {
    BlazeLayout.render ( 'App_body', { main : 'Account_profile' } )
  },
} );
// TODO: Add more of these for inserting restaurants
// TODO: Add more of these for editing restaurants
// TODO: Add another route specifically for viewing details of a restaurant

FlowRouter.route ( '/lists/:_id', {
  name : 'Lists.show',
  action() {
    BlazeLayout.render ( 'App_body', { main : 'Lists_show_page' } );
  },
} );

FlowRouter.route ( '/', {
  name : 'App.home',
  action() {
    BlazeLayout.render ( 'App_body', { main : 'app_rootRedirector' } );
    // BlazeLayout.render ( 'App_body', { main : 'App_main' } );
  },
} );

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render ( 'App_body', { main : 'App_notFound' } );
  },
};

AccountsTemplates.configureRoute ( 'signIn', {
  name : 'signin',
  path : '/signin',
} );

AccountsTemplates.configureRoute ( 'signUp', {
  name : 'join',
  path : '/join',
} );

AccountsTemplates.configureRoute ( 'forgotPwd' );

AccountsTemplates.configureRoute ( 'resetPwd', {
  name : 'resetPwd',
  path : '/reset-password',
} );
