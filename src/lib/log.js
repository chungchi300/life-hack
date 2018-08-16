const chalk = require("chalk");
module.exports = {
  good(msg) {
    console.log(chalk.white(msg));
  },
  important(msg) {
    console.log(chalk.blue.bold(msg));
  },
  bad(msg) {
    console.log(chalk.red(msg));
  },
  normal(msg) {
    console.log(chalk.white(msg));
  }
};
