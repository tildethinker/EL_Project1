// Centralized error handling

/*
Used globally in the application to handle errors thrown by any middleware or controller.
Ensures consistent error responses and logs error details for debugging.
*/

// middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      error: true,
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;
  