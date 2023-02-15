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
    message: "Hello :name <br> Your account has been approved",
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

function sendEmail(user, mailType, variables = {}) {
  let message = mailTemplates[mailType].message
  message.replace(':name', user.name)
  Object.keys(variables).forEach((variable) => {
    message.replace(':' + variable, variables[variable])
  })
  var mailOptions = {
    from: 'toptepespor@gmail.com',
    to: user.email,
    subject: mailTemplates[mailType].subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail }