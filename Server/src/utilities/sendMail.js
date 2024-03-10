// sending mail with Nodemailer
import nodemailer from "nodemailer";
import ejs from "ejs";

export default async ({ email, subject, template, data }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const html = await ejs.renderFile("./src/mails/" + template, data);
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Errot:" + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
