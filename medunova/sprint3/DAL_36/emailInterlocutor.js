const nodemailer = require('nodemailer');
var receiverEmail = 'pejosag280@ichkoch.com';
const senderEmail = 'dalmations301@aol.com';
const senderEmailPassword = 'umfsbncidkvapdxm';
//monkecityforever
var emailContent = "Hello TA! give 10/10 pls";
const emailSubject = 'Sprint Demo 12/3';

var transporter = nodemailer.createTransport({
    service: 'aol',
    auth: {
        user: senderEmail,
        pass: senderEmailPassword
    }
});

var mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: emailSubject,
    text: emailContent
  };

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});