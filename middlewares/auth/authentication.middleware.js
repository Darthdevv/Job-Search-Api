import jwt from "jsonwebtoken";
import appError from "../../utils/appError.js";

const authenticationHandler = async (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;

  if (Authorization && Authorization.startsWith("Bearer")) {
    const token = Authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return next(new appError("Unauthorized , invalid token.", 403));
      }

      req.user = data;
      next();
    });
  } else {
    return next(new appError("Unauthorized, No token.", 402));
  }
};

export default authenticationHandler;
