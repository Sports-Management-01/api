var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'toptepespor@gmail.com',
    pass: 'vohluzkmhuxwquiz'
  }
});

const mailTemplates = {
  approveEmail: {
    message: "Hello :name <br> Your account has been approved. Add your courts as soon as possible",
    subject: "Account Activation"
  },
  waitingEmail: {
    message: "Hello :name <br> We verify your company .  your account will be activated as soon as possible",
    subject: "Account Activation"
  },
  reservationCancellation: {
    message: "Hello :name <br> Your reservation on :date for :field has been cancelled",
    subject: "Reservation has been cancelled"
  }
}

// sendEmail(user, "reservationCancellation", {
//   date: "2023-01-01",
//   field: "Stad Alarab"
// })
//send email
function sendPosta(email, token) {
 
  var email = email;
  var token = token;

  var mailOptions = {
    from: 'toptepespor@gmail.com',
      to: email,
      subject: 'Reset Password Link - Toptepe.com',
      html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  }
 transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });}
function sendEmail(user, mailType, variables = {}) {
  let message = mailTemplates[mailType].message
  message = message.replace(':name', user.name)
  for (const variable of Object.keys(variables)) {
    message = message.replace(':' + variable, variables[variable])
  }
  var mailOptions = {
    from: 'toptepespor@gmail.com',
    to: user.email,
    subject: mailTemplates[mailType].subject,
    html: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail, sendPosta }