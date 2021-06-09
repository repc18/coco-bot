// Main code for the server
const express = require("express");
const morgan = require("morgan");

const app = express();

// app configuration
app.set("port", process.env.PORT || 3000);

// setup express application
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app routes
require("./routes/webhook-verify")(app);

app.get("/", (req, res) => {
  res.send({
    message: "Server is running!",
  });
});

app.listen(app.get("port"), () => {
  const url = "http://localhost:" + app.set("port");
  console.log("Application running on port: ", app.get("port"));
});
