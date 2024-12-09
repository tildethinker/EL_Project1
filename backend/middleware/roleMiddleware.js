// Role-based access control middleware

/*
Used in conjunction with authMiddleware.js to enforce role-based access control.
Checks whether the authenticated user (req.user) has the required role(s) to access a route.
*/
// middleware/roleMiddleware.js

const roleAuthorization = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
      next();
    };
  };
  
  module.exports = roleAuthorization;
  