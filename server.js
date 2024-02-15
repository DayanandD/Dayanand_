const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dayananddongare@outlook.com',
      pass: 'Daya@2796'
    }
  });

  const mailOptions = {
    from: 'dayananddongare@outlook.com',
    to: email,
    subject: subject || 'New Email',
    text: body || 'This is the body of the email'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
