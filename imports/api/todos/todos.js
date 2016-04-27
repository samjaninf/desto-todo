import {Mongo} from 'meteor/mongo';
import {Factory} from 'meteor/factory';
import faker from 'faker';

import incompleteCountDenormalizer from './incompleteCountDenormalizer.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Lists} from '../lists/lists.js';

class TodosCollection extends Mongo.Collection {
  insert( doc, callback ) {
    const ourDoc     = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date ();
    const result     = super.insert ( ourDoc, callback );
    incompleteCountDenormalizer.afterInsertTodo ( ourDoc );
    return result;
  }

  update( selector, modifier ) {
    const result = super.update ( selector, modifier );
    incompleteCountDenormalizer.afterUpdateTodo ( selector, modifier );
    return result;
  }

  remove( selector ) {
    const todos  = this.find ( selector ).fetch ();
    const result = super.remove ( selector );
    incompleteCountDenormalizer.afterRemoveTodos ( todos );
    return result;
  }
}

export const Todos = new TodosCollection ( 'Todos' );

// Deny all client-side updates since we will be using methods to manage this collection
Todos.deny ( {
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
} );

Todos.schema = new SimpleSchema ( {
//  listId: {
//    type: String,
//    regEx: SimpleSchema.RegEx.Id,
//    denyUpdate: true,
//  },
//  text: {
//    type: String,
//    max: 100,
//  },
//  createdAt: {
//    type: Date,
//    denyUpdate: true,
//  },
//  checked: {
//    type: Boolean,
//    defaultValue: false,
//  },
  name              : { type : String }
  , facebookUrl     : { type : String, regEx : SimpleSchema.RegEx.Url, optional : true }
  , twitterUrl      : { type : String, regEx : SimpleSchema.RegEx.Url, optional : true }
  , pinterestUrl    : { type : String, regEx : SimpleSchema.RegEx.Url, optional : true }
  , website         : { type : String, regEx : SimpleSchema.RegEx.Url, optional : true }
  , menu            : { type : String, regEx : SimpleSchema.RegEx.Url, optional : true }
  , special         : { type : [ String ], optional : true }
  , logo            : { type : String, optional : true }
  , incompleteCount : { type : Number, defaultValue : 0 }
  , ownerId         : { type : String, regEx : SimpleSchema.RegEx.Id }
  , moderators      : { type : [ String ], regEx : SimpleSchema.RegEx.Id, optional : true }
  , isActivated     : { type : Boolean, defaultValue : false }
  , isAvailable     : { type : Boolean, defaultValue : false }
  , createdAt       : { type : Date }
  , modifiedAt      : { type : Date }
} );

Todos.attachSchema ( Todos.schema );

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Todos.publicFields = {
//  listId: 1,
//  text: 1,
//  createdAt: 1,
//  checked: 1,
  name              : 1
  , incompleteCount : 1
  , facebookUrl     : 1
  , twitterUrl      : 1
  , pinterestUrl    : 1
  , website         : 1
  , menu            : 1
  , special         : 1
  , logo            : 1
  , ownerId         : 1
  , moderators      : 1
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
Factory.define ( 'todo', Todos, {
  listId    : () => Factory.get ( 'list' ),
  text      : () => faker.lorem.sentence (),
  createdAt : () => new Date (),
} );

Todos.helpers ( {
  list() {
    return Lists.findOne ( this.listId );
  },
  editableBy( userId ) {
    return this.list ().editableBy ( userId );
  },
} );
