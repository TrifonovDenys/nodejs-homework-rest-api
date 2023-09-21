const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    return next(HttpError(401));
  }
};

module.exports = authenticate;
