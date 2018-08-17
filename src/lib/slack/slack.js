const { WebClient } = require("@slack/client");

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const { token } = require("./config");
const log = require("../log");
const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID

module.exports = {
  async sendSlack(conversationId, text) {
    let res = await web.chat.postMessage({
      channel: conversationId,
      text: text
    });
  },
  logSlack(conversationId, text) {
    log.important(`Sending to : ${conversationId}`);
    log.important(`text :  ${text}`);
  }
};

/**
 *
  // See: https://api.slack.com/methods/chat.postMessage

 */
