// JWT or OAuth authentication setup

/*
This file sets up Passport.js with the JWT strategy. It extracts the JWT token from the request headers, verifies it using the secret from the configuration, and then checks the user in the database. If the token is valid and the user exists, Passport authenticates the request. Otherwise, it rejects the request.
*/

// config/passport.js

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { pool } = require('./db');
const config = require('./config');

// Define the JWT strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract JWT token from the Authorization header
  secretOrKey: config.JWT_SECRET,  // Use the JWT secret from the config file
};

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    // Find the user in the database based on the userId from the JWT payload
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.userId]);

    if (!result.rows[0]) {
      return done(null, false);  // User not found, authentication failed
    }

    return done(null, result.rows[0]);  // User found, authentication successful
  } catch (err) {
    return done(err, false);  // If error occurs, reject the authentication
  }
});

// Initialize Passport and use the JWT strategy
passport.use(jwtStrategy);

module.exports = passport;
