Meteor.startup ( function () {
//if ( Meteor.settings && Meteor.settings.env && _.isObject ( Meteor.settings.env ) ) {
//  for ( var variableName in Meteor.settings.env ) {
//    process.env[ variableName ] = Meteor.settings.env[ variableName ];
//  }
//}

  const services = Meteor.settings.private.oauth

//  const configure = () => {
    if ( services ) {
      for ( let service in services ) {
        ServiceConfiguration.configurations.upsert ( { service : service }, {
          $set : services[ service ]
        } )
      }
    }
} )