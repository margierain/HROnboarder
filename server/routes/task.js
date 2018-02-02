
let onboarderSchema = require('../model/task');

function getTasks(req, res) {
  let query = onboarderSchema.find();
  query.exec((err, task) => {
    if (err) res.status(500).send(err);
    res.status(200).json(task)
  })
}

module.exports = { getTasks };