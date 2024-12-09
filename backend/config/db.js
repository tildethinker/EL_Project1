// Database setup and configuration

/*
This file sets up a connection to the PostgreSQL database using the pg library. It uses a Pool instance for database connections and ensures the database connection is successful when the server starts.
*/

// config/db.js

const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
