/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req,res){		
		res.view();	
	},

	'create': function(req, res, next){
		//Create a Movie with the params sent from
		//the insert form ==> new.ejs

		Movie.create(req.params.all(), function movieCreated(err, movie){
			//if there's an error
			if(err){
				console.log(err);
				req.session.flash = {
					err: err
				}
				//If error redirect back to sign-up page
				return res.redirect('/movie/new');
			} 

			//after successfully creating the movie
			//redirect to the show action
			res.redirect('movie/show/'+movie.id);
			
		});
	},
	//render the profile view (e.g. /views/show.ejs)
	'show': function (req, res, next){
		Movie.findOne({'id': req.params['id']}, function(err, movie) {
          res.view({
          	movie: movie
          });
    	});	
	},

	index: function (req, res, next){
		//Get an array of all users in the user collection(e.g. table)
		Movie.find(function foundMovies(err, movies){
		if(err) return next(err);
		//pass the array down to the /views/index.ejs page
		res.view({
			movies: movies
		});
	});	
},

	//render the edit view (e.g /views/edit.ejs)
	edit: function (req, res, next){

		//find the user from the id passed in via params
		Movie.findOne(req.param('id'), function foundMovie(err,movie){
		if(err) return next(err);
		if(!movie) return next();

		res.view({
			movie:movie
		});
	});	
	},
	

	//process the info from edit view
	update: function (req, res, next){
		Movie.update(req.param('id'),req.params.all(),function movieUpdate(err){
			if(err){
				return res.redirect('movie/edit/' + req.param('id'));
			}
			res.redirect('movie/show/'+req.param('id'));
		});
	},

	//delete

	destroy: function (req, res, next){
		Movie.findOne(req.param('id'), function foundMovie(err,movie){
			if(err) return next(err);

			if(!movie) return next('Movie doesn\'t exist.');

			Movie.destroy(req.param('id'), function movieDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/movie');
		});
	}


};