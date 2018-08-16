const _ = require("lodash");
const to = "chungchi300@hotmail.com";
var today = new Date();
var utc = new Date()
  .toJSON()
  .slice(0, 10)
  .replace(/-/g, "/");
const subject = `A testing mail is sent on ${utc}`;
const defaultBodyOptions = { reason: "Testing", speedUp: "10x" };
function body(bodyOptions) {
  console.log("bodyOptions", bodyOptions);
  let finalOptions = {};
  for (let defaultKey of Object.keys(defaultBodyOptions)) {
    finalOptions[defaultKey] = _.get(
      bodyOptions,
      defaultKey,
      defaultBodyOptions[defaultKey]
    );
  }
  return `For ${
    finalOptions.reason
  },Discover that working speed has been upgrade to ${finalOptions.speedUp}`;
}
module.exports = {
  to,
  subject: subject,
  body
};
