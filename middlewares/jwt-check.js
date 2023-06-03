const jwt = require("jsonwebtoken");
const { getToken } = require("../db/auth");

function jwtCheck(secret) {
  return async function (req, res, next) {
    const { token: jwToken } = req.query;
    const { userId, companyId } = jwt.verify(jwToken, secret);
    const accessToken = await getToken(userId, companyId);
    req.apiClient.userId = userId;
    req.apiClient.updateToken(accessToken);
    next();
  };
}

module.exports = jwtCheck;
