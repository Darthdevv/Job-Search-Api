import User from "../../models/user.model.js";
import appError from "../../utils/appError.js";

/**
 * @param {Array} allowedRoles - Array of allowed roles based on the router
 * @returns  {Function} - Middleware function
 * @description -Can you do that ?...Checks if the user role is allowed to access the route
*/

const authorizationHandler = (allowedRoles) => {
  return async (req, res, next) => {
    // Get the loggedIn user from the request authUser from auth middleware
    const loggedUser = req.user;
    const authorizedUser = await User.findById(loggedUser.id);
    // Check if the allowed roles array includes the user role
    if (!allowedRoles.includes(authorizedUser.role)) {
      return next(
        new appError(
          "Authorization Error: You are not allowed to access this route",
          401
        )
      );
    }
    next();
  };
}

export default authorizationHandler;