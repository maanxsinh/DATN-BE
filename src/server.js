const viewEngine = require("./config/viewEngine.js");
const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./route/web.js");
const connectDb = require("./config/connectDb.js");
// const initAPIRouter = require("./route/api.js");
var cors = require("cors");
require("dotenv").config();

let app = express();

app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

// initAPIRouter();

connectDb();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("SERVER RUNNING");
});
