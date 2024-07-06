import appError from "../../utils/appError";

const authorizationHandler = (roles) => {
  return async (req, res, next) => {
    const user = req.user;

    if (!roles.includes(user.role)) {
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