import nodemailer from "nodemailer";
import pug from "pug";
import mg from "nodemailer-mailgun-transport";
import htmlToText from "html-to-text";
import { __prod__ } from "../constatns";
import { User } from "src/entities/User";

export default class EmailSender {
  to: string;
  firstName: string;
  url: string;
  from: string;
  pin?: string;
  constructor(user: User, url: string, pin?: string) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `"Amine Louni" <${process.env.EMAIL_FROM}>`;
    this.pin = pin;
  }

  newTransport() {
    if (__prod__) {
      return nodemailer.createTransport(
        mg({
          auth: {
            api_key: process.env.MAILGUN_PRIVATE_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
          },
        })
      );
    }

    // Mailtrap
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,

      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template: string, subject: string) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
        pin: this.pin,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Liyelp cloneFamily!");
  }
  async sendValidationEmail() {
    await this.send(
      "emailValidation",
      "Your pin for email validation (valid for only 10 minutes)"
    );
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Reset your password (valid for only 10 minutes)"
    );
  }
  async sendValidationChangedEmail() {
    await this.send(
      "changeEmail",
      "Your pin for email validation (valid for only 10 minutes)"
    );
  }
}
