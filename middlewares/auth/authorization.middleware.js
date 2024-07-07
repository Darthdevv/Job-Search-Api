import User from "../../models/user.model.js";
import appError from "../../utils/appError.js";

const authorizationHandler = (allowedRoles) => {
  return async (req, res, next) => {
    const loggedUser = req.user;
    const authorizedUser = await User.findById(loggedUser.id);

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