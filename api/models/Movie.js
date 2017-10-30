/**
 * Movie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	schema: true,
  attributes: {
  	title: {
  		type: 'string',
  		required: true
  	},
  	release_date: {
  		type: 'date'
  		//required: true
  	},
  	duration: {
  		type: 'string',
  		//required: true,
  	},
  	genere: {
  		type: 'string'
  		//required: true
  	},
  	Synopsis: {
  		type: 'string'
  		//required: true
  	}


  }
};

