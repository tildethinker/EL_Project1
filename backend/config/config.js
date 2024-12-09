// Any other config variables (e.g., API keys)

/*
This file exports configuration settings such as the JWT secret, database connection details, and JWT expiration time. It will use environment variables, falling back to default values if they are not provided.
 */

// config/config.js

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',  // Secret key for JWT
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'myapp_db',
    DB_USER: process.env.DB_USER || 'username',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    JWT_EXPIRATION: '1h', // JWT expiration time
};
