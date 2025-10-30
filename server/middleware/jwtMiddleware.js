const jwt = require("jsonwebtoken");

const jwtMiddleware = (request, response, next) => {
  try {
    // Token format: "Bearer <token>"
    const token = request.headers.authorization.split(" ")[1];

    try {
      const user = jwt.verify(token, process.env.SECRETKEY);
      request.payload = user.user; // store user data in request
      next();
    } catch (error) {
      response.status(401).json({ message: "Invalid Token", error: error.message });
    }
  } catch (error) {
    response.status(400).json({ message: "Token missing or malformed", error: error.message });
  }
};

module.exports = jwtMiddleware;
