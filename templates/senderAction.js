// file that enables bot to show typing effect to the user
const request = require("request");

module.exports = function senderAction(recipientId) {
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
      },
      method: "POST",
      json: {
        recipient: {
          id: recipientId,
        },
        sender_action: "typing_on",
      },
    },
    function (error, response, body) {
      if (error) console.error("Error sending message: ", response.error);
    }
  );
};
