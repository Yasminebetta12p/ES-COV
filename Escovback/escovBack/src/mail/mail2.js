require('dotenv').config()
var nodemailer = require('nodemailer');

function sendEmail2(to, link) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "escov2022@gmail.com",
      pass: "qvkicauqlltfwacb",
    },
  });
  var mailOptions = {
    from: "escov2022@gmail.com",
    to: to,
    subject: "Email with link",
    html: `<a href="${link}">Click here</a> to access the link.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail2;