const _ = require("lodash");
const to = "";

const subject = `Thankyou for giving me the opportunity to have the interview`;
const defaultBodyOptions = { reason: "professional" };
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
  return `Wish we can talk about this opportunity in future`;
}
module.exports = {
  to,
  subject: subject,
  body
};
