import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Models from '../Models';
const User = Models.User;
const LocalStragtegy = require('passport-local').Strategy;

class Auth {
	constructor(passport) {
	  passport.use(
	  	new LocalStragtegy({usernameField:'email'},(email, password, done) => {
	  		//Match User
	  		User.findOne({
	  			email:email
	  		})
	  		.then(user => {
	  			if(!user){
		  			return done(null, false, {message:'That email is not registered'});
	  			}

    			// Match password
    			bcrypt.compare(password, user.password, (err, isMatch) => {
    				if (err) throw err;
    				if(isMatch){
    					return done(null, user);
    				}else{
    					return done(null,false, {message: 'Password incorrect'});
    				}
    			});
	  		});
	  	})
	  );

	  passport.serializeUser(function(user, done){
	  	done(null,user.id);
	  });

	  passport.deserializeUser(function(id, done){
	  	User.findByPk(id).then((err, user)=>{
	  		done(err, user);
	  	});
	  });
	}
}

export default Auth