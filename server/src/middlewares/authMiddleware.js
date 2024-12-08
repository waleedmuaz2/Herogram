const jwt = require("jsonwebtoken");
const { pathToRegexp, match } = require('path-to-regexp');

const authenticateToken = (options = { skipRoutes: [] }) => {
  return (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    const { skipRoutes = [] } = options;
    const currentRoute = req.path;
    for (const route of skipRoutes) {
      const matcher = match(route, { decode: decodeURIComponent });
      const matched = matcher(currentRoute);
      if (matched) {
        return next();
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  };
};

module.exports = authenticateToken;
