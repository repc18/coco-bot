const dialogflow = require("dialogflow");
const uuid = require("uuid");
const senderAction = require("../templates/senderAction");
const sendGenericTemplate = require("../templates/sendGenericTemplate");

const projectID = "coco-bot-qshx";
const languageCode = "en-US";
const config = {
  credentials: {
    private_key: JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY),
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const sessionID = uuid.v4();
const sessionClient = new dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectID, sessionID);

module.exports = function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: ", senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      let text = message.text;
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: text,
            languageCode: languageCode,
          },
        },
      };
      sessionClient
        .detectIntent(request)
        .then((responses) => {
          const result = responses[0].queryResult;
          senderAction(senderID);
          return sendGenericTemplate(senderID, result.fulfillmentText);
        })
        .catch((err) => {
          console.error("ERROR: ", err);
        });
    }
  }
};
