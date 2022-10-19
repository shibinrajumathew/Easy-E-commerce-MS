const mongoose = require("mongoose");
const config = require("../config");

const {
  database: { baseUrl, url, dbName, user, secret, params },
} = config;
/**
 * @function
 *
 * Establising connection to db server
 */

exports.connect = () => {
  let connectionUrl = `${baseUrl}${user}:${secret}@${url}/${dbName}`;
  if (params) connectionUrl += params;
  mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.log(`MongoDB connection error: ${error}`);
  });
  db.once("open", () => {
    console.log(`DB connection established`);
  });
};
