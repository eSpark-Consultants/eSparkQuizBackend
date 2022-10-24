
const SendMail = (toUser, otp) => {
    console.log("send mail running")
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "development@appstirr.com", // Your email id
          pass: "Wg@rW6#@Z&", // Your password
        },
    })

    message = {
        from: "development@appstirr.com",
        to: toUser,
        subject: "Account Verification",
        text: `your Reset Password OTP is ${otp} `
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("error transporter", err)
        } else {
            console.log('transporter info', info);
        }
    })
}

const SendBookingCodeMail = (toUser, otp) => {
    console.log("send mail running")
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "development@appstirr.com", // Your email id
          pass: "7#FDGn@+P-", // Your password
        },
    })

    message = {
        from: "development@appstirr.com",
        to: toUser,
        subject: "Sanp Offer Booking Code",
        text: `your booking redeem code is ${otp} `
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("error transporter", err)
        } else {
            console.log('transporter info', info);
        }
    })
}

module.exports = {SendMail, SendBookingCodeMail}
