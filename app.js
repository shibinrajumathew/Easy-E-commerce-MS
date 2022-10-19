const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const globalErrorHandler = require("./utils/globalErrorHandler");
const responseHandler = require("./utils/responseHandler");
const db = require("./utils/db");
const indexRouteV1 = require("./routes/v1/indexRouteV1");
const bodyParser = require("body-parser");

// require('dotenv').config(); //To do move this line to config file using 'or' operator use with current config
/**
 * This middleware provides a consistent API
 * for MySQL connections during request/response life cycle
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
db.connect();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger-doc.yml");

//To do remove these line
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
// app.use(bodyParser.raw());
// app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/", indexRouteV1);
//Global response handler
app.use(responseHandler);

//Global error handler
app.use(globalErrorHandler);

module.exports = app;
