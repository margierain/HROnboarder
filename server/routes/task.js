
let onboarderSchema = require('../model/task');

function getTasks(req, res) {
  let query = onboarderSchema.find();
  query.exec((err, task) => {
    if (err) res.status(500).send(err);
    res.status(200).json(task)
  })
}


function postTask(req, res) {

  var newOnboard = new onboarderSchema(req.body);
  newOnboard.save((err, onboard) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(201).json({ message: "Onboarder details created successfully", onboard });
    }
  });
}

function updateTask(req, res) {
  onboarderSchema.findById({ _id: req.params.id }, (err, task) => {
    Object.assign(task, req.body).save((err, task) => {
      if (err) res.status(500).send(err);
      res.status(200).json({ message: 'Onboarder details updated successfully', task })
    })
  })
}

module.exports = { getTasks, postTask, updateTask };