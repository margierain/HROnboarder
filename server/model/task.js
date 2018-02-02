let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let onboarder = Schema({
  employeeName: { type: String, required: true },
  beforeHireTask: [
    {
      task: String, required: Boolean,
      completed: Boolean, default: false,
      dueDate: {
        type: Date, required: true
      }
    }
  ],
  afterHireTask: [
    {
      task: String, required: Boolean,
      completed: Boolean, default: false,
      dueDate: {
        type: Date, required: true
      }
    }
  ],
  entryDate: { type: Date, required: Boolean },
  adminEmail: { type: String, required: true }
})

onboarder.pre('save', next => {
  if (!this.entryDate) {
    this.entryDate = new Date;
  }
  next();
});


module.exports = mongoose.model('onboarder', onboarder);