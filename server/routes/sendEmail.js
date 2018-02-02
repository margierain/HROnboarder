const sgMail = require('@sendgrid/mail');
const config = require('config');
let onboarderSchema = require('../model/task');

sgMail.setApiKey(config.SENDGRID_API_KEY);

function sendEmail() {
  console.log('beforeHireTask');
  let query = onboarderSchema.find({});
  query.exec((err, tasks) => {
    if (err) {
      console.error(err);
    }
    tasks.map(task => {
      if (task.beforeHireTask.map(data => { data.dueDate >= new Date() })) {
        const msg = {
          to: task.adminEmail,
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: `Name of new employee ${task.employeeName}, expected task before hire : , ${tasks} expected tasks`,
          html: `<strong>Name of new employee ${task.employeeName}, expected task after hire : , ${tasks}}</strong>`,
        };
        sgMail.send(msg);
      }
      else if (task.afterHireTask.map(data => { data.dueDate >= new Date() })) {
        let tasks = {};
        task.afterHireTask.map(task => {
          return Object.assign(tasks, task.name, task.complete)
        })
        const msg = {
          to: task.adminEmail,
          from: 'test@example.com',
          subject: 'Sending with SendGrid is Fun',
          text: `Name of new employee ${task.employeeName}, expected task after hire :, ${tasks}`,
          html: `<strong>Name of new employee: ${task.employeeName}, expected task after hire :, ${task}</strong>`,
        };
        sgMail.send(msg);
      } else {
        console.log('No emails to send');
      }
    });
  })
};

setInterval(sendEmail, 15000);


module.exports = { sendEmail };