const express = require("express");
require("express-async-errors");
const path = require("path");
const bodyParser = require("body-parser");

const errorHandler = require("./middlewares/error-handler");
const oauthContext = require("./middlewares/oauth-context");
const jwtCheck = require("./middlewares/jwt-check");

const config = require("./config");

const app = express();

app.use(errorHandler);
app.use(oauthContext);
app.use(express.static("out"));

app.get("/callback", require("./endpoints/callback"));

app.get("/modal", jwtCheck(config.MODAL_JWT), (req, res) => {
  res.sendFile(path.join(__dirname, "out/index.html"));
});

app.get(
  config.GET_PERSONS_ENDPOINT,
  jwtCheck(config.MODAL_JWT),
  require("./endpoints/get-persons")
);

app.post(
  config.POST_DEALS_ENDPOINT,
  bodyParser.json(),
  jwtCheck(config.MODAL_JWT),
  require("./endpoints/post-deal")
);

app.listen(config.PORT, () => {
  console.log(`Started listening on port ${config.PORT}`);
});
