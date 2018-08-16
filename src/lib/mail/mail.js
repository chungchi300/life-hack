const _ = require("lodash");
const nodemailer = require("nodemailer");
const { user, pass } = require("./config");

const header = require("./part/header");
const footer = require("./part/footer");
const log = require("../log");
var requireGlob = require("require-glob");
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
module.exports = {
  getMail(mailFileName) {
    let files = requireGlob.sync("template/*.js");

    const mail = files[mailFileName];
    if (mail == undefined) {
      throw Error("Mail template not found");
    }
    return mail;
  },
  getMailContent(mail, recipient, bodyOptions) {
    const markdown = `
    ${header(recipient)}

            
    ${mail.body(bodyOptions)} 
            

    ${footer}
    `;
    return markdown;
  },
  logMail(mailContent, to) {
    log.important(`Sending to : ${to}`);
    log.important(`From user email : ${user}`);
    log.normal(mailContent);
  },
  async sentMail(markdownMail, subject, to) {
    const FINAL_OPTION = {
      user: user,
      to: to,
      subject: _.upperFirst(subject),
      html: md.render(markdownMail)
    };

    var transporter = nodemailer.createTransport({
      host: "smtp.office365.com", // Office 365 server
      port: 587, // secure SMTP
      secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        ciphers: "SSLv3"
      }
    });
    return await transporter.sendMail(FINAL_OPTION);
  }
};
