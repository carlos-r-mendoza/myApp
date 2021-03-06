'use strict';

module.exports = function (app, session, passport) {

	// express session
	app.use(session({ secret: 'meanstackapp', 
	                  resave: false,
	                  saveUninitialized: false}));

	// passport session
	app.use(passport.initialize());
	app.use(passport.session());

	//telling passport how to attach a user to a session
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	//telling passport how to get an actual user from the session
	passport.deserializeUser(function(user, done) { 
	    done(null, user);
	});

};