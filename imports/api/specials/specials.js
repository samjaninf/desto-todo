import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/factory';
import {Todos} from '../todos/todos.js';
import {GridFS} from 'meteor/cfs:gridfs'

class SpecialsCollection extends FS.Collection {
  insert( special, callback ) {

    return super.insert ( special, callback );
  }

  remove( selector, callback ) {
    Todos.remove ( { specialId : selector } );
    return super.remove ( selector, callback );
  }
}

const createThumb = ( fileObj, rStream, wStream ) => {
  gm ( rStream, fileObj.name () ).resize ( '150', '200' ).stream ().pipe ( wStream )
}

const specials = new FS.Store.GridFS ( "specials" )
const thumbs   = new FS.Store.GridFS ( "thumbs", {
  transformWrite : createThumb
} )

export const Specials = new SpecialsCollection ( "specials", {
  stores : [
    thumbs
    , specials
  ],
  filter : {
    maxSize : 26214400,
    allow   : {
      contentTypes : [ 'image/*' ]
    }
  }
} )

export const Specials = new SpecialsCollection ( 'Specials' );

// Deny all client-side updates since we will be using methods to manage this collection
Specials.deny ( {
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
  download() { return true; },
} );