#!/usr/bin/env node

const inquirer = require("inquirer");
const { getMailContent, getMail, sentMail, logMail } = require("./mail");
const { user } = require("./config");
const _ = require("lodash");
var argv = require("minimist")(process.argv.slice(2));
var program = require("commander");
const log = require("../log");
async function main() {
  function bodyOption(val) {
    let bodyOptionGroups = val.split(",");
    let bodyOptions = {};
    for (let bodyOptionGroup of bodyOptionGroups) {
      let splitVal = bodyOptionGroup.split("=");
      bodyOptions[splitVal[0]] = splitVal[1];
    }
    return bodyOptions;
  }

  program
    .version("0.1.0")
    .option("--template [value]", "Specific Mail Template", "testing")
    .option("--to [value]", "Recipient email", "All")
    .option("--recipient [value]", "Recipient name", user)
    .option("-f", "Direct send the email")
    .option(
      "--body <items> ,e.g reason=good,speedUp=20x",
      "Recipient name",
      bodyOption
    );
  program.parse(process.argv);

  const mail = getMail(program.template);
  const to = program.to ? program.to : mail.to;

  let mailContent = getMailContent(mail, program.recipient, program.body);

  if (program.f) {
    await sentMail(mailContent, mail.subject, mail.to);

    logMail(mailContent, to);
    log.good("Sent");
  } else {
    logMail(mailContent, to);
    var questions = [
      {
        type: "list",
        name: "confirm",
        message: "",
        choices: ["Yes", "No"]
      }
    ];
    let answers = await inquirer.prompt(questions);
    if (answers.confirm == "Yes") {
      log.good("Sent");
      await sentMail(mailContent, mail.subject, mail.to);
    } else {
      log.bad("Cancel");
    }
  }
}
main();
