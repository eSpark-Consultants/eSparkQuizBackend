const SendMail = (toUser, user) => {
  console.log("send mail running");
  const nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: process.env.MAIL_EMAIL, //"4e4c0b32d63976",
      pass: process.env.MAIL_PASSWORD, //"5fa31bb53598d2"
    },
  });

  let from = `eSpark Lunch Department <lunchdepartment@esparkconsultants.com>`
  message = {
    from: from,
    to: toUser,
    subject: "Account For eSpark Lunch App",
    html: `<div>
        <p>Respected ${user?.name}<br/>
        <p>Welcome to eSpark Lunch App <br/>
            Your account is created for using <b>eSpark Lunch Application</b> for login use below credentials. 
            <br/><br/>
            <b> Email: ${user?.email}, <br/> Password: ${user?.password} </b>
        </p>
        <br /> <br /> <br />
        <strong>eSpark Consulting Group © ${new Date().getFullYear()}</strong>
        <br />
        <strong>Lunch Department</strong>
        </div>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log("error transporter", err);
    } else {
      console.log("transporter info", info);
    }
  });
};

module.exports = { SendMail };
