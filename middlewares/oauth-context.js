const pipedrive = require("pipedrive");
const config = require("../config");

async function oauthContext(req, res, next) {
  const apiClient = new pipedrive.ApiClient();

  const oauth = apiClient.authentications.oauth2;

  oauth.clientId = config.CLIENT_ID;
  oauth.clientSecret = config.CLIENT_SECRET;
  oauth.redirectUri = config.REDIRECT_URI;

  req.apiClient = apiClient;

  next();
}

module.exports = oauthContext;
