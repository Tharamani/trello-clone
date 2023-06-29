var express = require("express");
var cors = require("cors");
var boardRouter = require("./routes/board");
var listRouter = require("./routes/list");
var cardRouter = require("./routes/card");
const { connectDb } = require("./config/db");

try {
  // Create an instance of the Express app
  var app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/boards", boardRouter); // mount the router on the app
  app.use("/lists", listRouter);
  app.use("/cards", cardRouter);
  connectDb();

  app.listen(process.env.SERVER_PORT || 6000, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`);
  });
} catch (error) {
  console.log("Server Error", error);
}

module.exports = app;
