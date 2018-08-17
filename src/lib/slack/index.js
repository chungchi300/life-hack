#!/usr/bin/env node

const inquirer = require("inquirer");

const _ = require("lodash");

var program = require("commander");
const log = require("../log");
async function main() {
  program
    .version("0.1.0")

    .option("--text [value]", "text message to be sent", "testing")
    .option("--conversationId [value]", "conversation Id")
    .option("-f", "Direct send the email");

  program.parse(process.argv);

  if (!program.conversationId) {
    throw Error("conversation Id is required");
  }

  if (program.F) {
    logSlack(program.conversationId, program.text);
    await sendSlack(program.conversationId, program.text);
    log.good("Sent");
  } else {
    logSlack(program.conversationId, program.text);
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
      await sendSlack(program.conversationId, program.text);
    } else {
      log.bad("Cancel");
    }
  }
}
main();
