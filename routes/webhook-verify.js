// create webhook endpoint that accepts POST requests
// the endpoint is where the Messenger platform will send all webhook events
const processPostback = require("../processes/postback");
const processMessage = require("../processes/messages");

module.exports = (app, chalk) => {
  app.get("/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
      console.log("Webhook verified");
      res.status(200).send(req.query["hub.challenge"]);
    } else {
      console.error("Verification failed. Token mismatch.");
      res.status(403);
    }
  });

  app.post("/webhook", (req, res) => {
    // check for page subscription
    if (req.body.object === "page") {
      // iterate over each entry, there can be multiple entries
      // if callbacks are batched
      req.body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          console.log(event);
          if (event.postback) {
            processPostback(event);
          } else if (event.message) {
            processMessage(event);
          }
        });
      });
      res.status(200);
    }
  });
};
