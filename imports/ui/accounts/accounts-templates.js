import {Meteor} from 'meteor/meteor'
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {sweetAlert} from 'meteor/sweetalert'

import './accounts-templates.html';

// We identified the templates that need to be overridden by looking at the available templates
// here: https://github.com/meteor-useraccounts/unstyled/tree/master/lib
Template[ 'override-atPwdFormBtn' ].replaces ( 'atPwdFormBtn' );
Template[ 'override-atPwdForm' ].replaces ( 'atPwdForm' );
Template[ 'override-atTextInput' ].replaces ( 'atTextInput' );
Template[ 'override-atTitle' ].replaces ( 'atTitle' );
Template[ 'override-atError' ].replaces ( 'atError' );

Template.socialButtons.events ( {
  'click .js-login-twitter'( event ) {
    event.preventDefault ()
    Meteor.loginWithTwitter ( {}, ( err ) => {
      if ( err ) {
        throw new Meteor.Error ( 'socialButtonTwitterLoginFailed', 'Twitter Login Failed!' )
      }
      FlowRouter.go ( 'App.home' );
    } )
  },
  'click .js-login-google'( event ) {
    event.preventDefault ( "Google button pressed!" )
    Meteor.loginWithGoogle ( { requestPermissions : [ "email" ] }, ( err ) => {
      if ( err ) {
        throw new Meteor.Error ( 'socialButtonTwitterLoginFailed', 'Facebook Login Failed!' )
      }
      FlowRouter.go ( 'App.home' );
    } )
  },
  'click .js-login-facebook'( event ) {
    event.preventDefault ( "Facebook button pressed!" )
    Meteor.loginWithFacebook ( { requestPermissions : [ "email" ] }, ( err ) => {
      if ( err ) {
        throw new Meteor.Error ( 'socialButtonTwitterLoginFailed', 'Facebook Login Failed!' )
      }
      FlowRouter.go ( 'App.home' );
    } )
  },
} )