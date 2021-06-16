const fetch = require("node-fetch");

module.exports = function sendGenericTemplate(userID, text) {
  return fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        messaging_type: "RESPONSE",
        recipient: {
          id: userID,
        },
        message: {
          text,
        },
      }),
    }
  );
};
